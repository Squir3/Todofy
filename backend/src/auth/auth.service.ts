import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  /**
   * Injecting required services
   * @param userService
   * @param jwtService
   * @param configService
   */
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Creates new user
   * @param {CreateUserDto} createUserDto
   * @returns {Tokens} refreshToken
   */

  async register(createUserDto: CreateUserDto) {
    //Checking if user exists
    const emailExists = await this.userService.findByEmail(createUserDto.email);
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const userNameExists = await this.userService.findByUsername(
      createUserDto.username,
    );
    if (userNameExists) {
      throw new BadRequestException('Username already exists');
    }

    //hashing password with bcrypt
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    console.log(createUserDto);
    const createdUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    //return createdUser;

    const tokens = await this.generateTokens(
      createdUser._id,
      createdUser.email,
    );
    await this.updateRefreshedToken(createdUser._id, tokens.refreshedToken);
    return tokens;
  }

  /**
   * login method
   * @param {AuthDto} authDto
   * @return{Tokens} tokens
   */
  async login(authDto: AuthDto) {
    //Checking if user exists
    const user = await this.userService.findByEmail(authDto.email);
    if (!user) throw new BadRequestException('User does not exists');

    //checking if passwords matches
    const passwordMatches = await bcrypt.compare(
      authDto.password,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Email or password is incorrect');

    //generating token for client
    const tokens = await this.generateTokens(user._id, user.email);

    //updating the user's refresh token
    await this.updateRefreshedToken(user._id, tokens.refreshedToken);

    console.log(tokens);
    return tokens;
  }

  async logout(userId: string) {
    //Sets refreshed token to NULL
    return await this.userService.update(userId, { refreshedToken: null });
  }

  async updateRefreshedToken(userId: string, refreshedToken: string) {
    const hashedRefreshedToken = await bcrypt.hash(refreshedToken, 10);
    await this.userService.update(userId, {
      refreshedToken: hashedRefreshedToken,
    });
  }

  async generateTokens(userId: string, email: string) {
    const [accessToken, refreshedToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH'),
          expiresIn: '30d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshedToken,
    };
  }

  async refreshTokens(email: string, refreshedToken: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !user.refreshedToken)
      throw new BadRequestException('You are not authorized');

    const refreshedTokenMatches = await bcrypt.compare(
      user.refreshedToken,
      refreshedToken,
    );
    if (!refreshedTokenMatches)
      throw new BadRequestException('You are not authorized');

    const tokens = await this.generateTokens(user._id, user.email);
    await this.updateRefreshedToken(user._id, tokens.refreshedToken);
  }
}
