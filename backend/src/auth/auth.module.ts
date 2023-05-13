import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AccessJwtStrategy } from './strategies/accessJwt.strategy';
import { RefreshTokenStrategy } from './strategies/tokenRefresh.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, RefreshTokenStrategy],
  imports: [JwtModule.register({}), ConfigModule.forRoot(), UsersModule],
})
export class AuthModule {}
