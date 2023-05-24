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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const auth_dto_1 = require("./dto/auth.dto");
const accessTokenGuard_1 = require("./guards/accessTokenGuard");
let AuthController = class AuthController {
    constructor(authService, jwtService, usersService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async register(createUserDto) {
        return this.authService.register(createUserDto);
    }
    async login(authDto, response) {
        const tokens = await this.authService.login(authDto);
        response.cookie('access_token', tokens.accessToken, {
            httpOnly: false,
            maxAge: 60 * 60 * 1000,
        });
        response.cookie('refresh_token', tokens.refreshedToken, {
            httpOnly: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        response.setHeader('Authorization', `Bearer ${tokens.accessToken}`);
        return tokens;
    }
    async findLogged(req) {
        return await this.usersService.findLoggedUser(req.user['email']);
    }
    async logout(req, response) {
        await this.authService.logout(req.user['sub']);
        response.clearCookie('access_token');
        response.clearCookie('refresh_token');
        return {
            message: 'success',
        };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(accessTokenGuard_1.AccessTokenGuard),
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findLogged", null);
__decorate([
    (0, common_1.UseGuards)(accessTokenGuard_1.AccessTokenGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map