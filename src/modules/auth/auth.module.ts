import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { UserRepository } from 'src/modules/user/user.repository';
import { UserService } from 'src/modules/user/user.service';
import { RoleRepository } from '../user/role.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
