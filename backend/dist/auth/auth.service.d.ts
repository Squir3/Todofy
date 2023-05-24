import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshedToken: string;
    }>;
    login(authDto: AuthDto): Promise<{
        accessToken: string;
        refreshedToken: string;
    }>;
    logout(userId: string): Promise<import("../users/schemas/user.schema").UserDocument>;
    updateRefreshedToken(userId: string, refreshedToken: string): Promise<void>;
    generateTokens(userId: string, email: string): Promise<{
        accessToken: string;
        refreshedToken: string;
    }>;
    refreshTokens(email: string, refreshedToken: string): Promise<void>;
}
