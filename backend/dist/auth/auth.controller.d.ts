import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    private usersService;
    constructor(authService: AuthService, jwtService: JwtService, usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshedToken: string;
    }>;
    login(authDto: AuthDto, response: Response): Promise<{
        accessToken: string;
        refreshedToken: string;
    }>;
    findLogged(req: Request): Promise<import("../users/schemas/user.schema").UserDocument>;
    logout(req: Request, response: Response): Promise<{
        message: string;
    }>;
}
