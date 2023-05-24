import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
type JwtPayload = {
    sub: string;
    email: string;
};
declare const AccessJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessJwtStrategy extends AccessJwtStrategy_base {
    private config;
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
