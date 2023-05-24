"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(createUserDto) {
        const emailExists = await this.userService.findByEmail(createUserDto.email);
        if (emailExists) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const userNameExists = await this.userService.findByUsername(createUserDto.username);
        if (userNameExists) {
            throw new common_1.BadRequestException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        console.log(createUserDto);
        const createdUser = await this.userService.create(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
        const tokens = await this.generateTokens(createdUser._id, createdUser.email);
        await this.updateRefreshedToken(createdUser._id, tokens.refreshedToken);
        return tokens;
    }
    async login(authDto) {
        const user = await this.userService.findByEmail(authDto.email);
        if (!user)
            throw new common_1.BadRequestException('User does not exists');
        const passwordMatches = await bcrypt.compare(authDto.password, user.password);
        if (!passwordMatches)
            throw new common_1.BadRequestException('Email or password is incorrect');
        const tokens = await this.generateTokens(user._id, user.email);
        await this.updateRefreshedToken(user._id, tokens.refreshedToken);
        console.log(tokens);
        return tokens;
    }
    async logout(userId) {
        return await this.userService.update(userId, { refreshedToken: null });
    }
    async updateRefreshedToken(userId, refreshedToken) {
        const hashedRefreshedToken = await bcrypt.hash(refreshedToken, 10);
        await this.userService.update(userId, {
            refreshedToken: hashedRefreshedToken,
        });
    }
    async generateTokens(userId, email) {
        const [accessToken, refreshedToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '1h',
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: this.configService.get('JWT_REFRESH'),
                expiresIn: '30d',
            }),
        ]);
        return {
            accessToken,
            refreshedToken,
        };
    }
    async refreshTokens(email, refreshedToken) {
        const user = await this.userService.findByEmail(email);
        if (!user || !user.refreshedToken)
            throw new common_1.BadRequestException('You are not authorized');
        const refreshedTokenMatches = await bcrypt.compare(user.refreshedToken, refreshedToken);
        if (!refreshedTokenMatches)
            throw new common_1.BadRequestException('You are not authorized');
        const tokens = await this.generateTokens(user._id, user.email);
        await this.updateRefreshedToken(user._id, tokens.refreshedToken);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map