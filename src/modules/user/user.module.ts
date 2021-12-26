import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
