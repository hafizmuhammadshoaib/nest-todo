import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}
  public findAll(): Promise<User[]> {
    return this.userRepo.find({ select: ['username', 'id', 'email'] });
  }

  public async createUser(user: UserDto.createUser): Promise<InsertResult> {
    user.password = await this.encryptPassword(user.password);
    return this.userRepo.insert(user);
  }

  public async updateUser(
    id: number,
    updateUser: UserDto.updateUser,
  ): Promise<UpdateResult> {
    updateUser.password = await this.encryptPassword(updateUser.password);
    return this.userRepo.update(id, updateUser);
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }

  private async encryptPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10;
    return await hash(plainTextPassword, saltRounds);
  }
}
