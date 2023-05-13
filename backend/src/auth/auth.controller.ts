import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/accessTokenGuard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  /**
   * Injecting services
   * @param userService
   * @param authService {AuthService}
   * @param jwtService
   */
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  /**
   * Endpoint to create new user account
   * @param createUserDto
   * @returns JWT token
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  /**
   * Allows user to login
   * @param authDto
   * @returns JWT Token
   */
  @Post('login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(authDto);
    response.cookie('access_token', tokens.accessToken, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000, // 1h
    });
    response.cookie('refresh_token', tokens.refreshedToken, {
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    response.setHeader('Authorization', `Bearer ${tokens.accessToken}`);
    return tokens;
  }

  @UseGuards(AccessTokenGuard)
  @Get('user')
  async findLogged(@Req() req: Request) {
    return await this.usersService.findLoggedUser(req.user['email']);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(req.user['sub']);
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return {
      message: 'success',
    };
  }
}
