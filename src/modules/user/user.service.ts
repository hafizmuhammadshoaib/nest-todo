import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { RoleRepository } from './role.repository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private roleRepo: RoleRepository,
  ) {}
  public findAll(): Promise<User[]> {
    return this.userRepo.find({ select: ['username', 'id', 'email'] });
  }

  public async createUser(user: UserDto.createUser): Promise<InsertResult> {
    user.password = await this.encryptPassword(user.password);
    const _user: User = await this.getUserWithRoleId(user);
    return this.userRepo.insert(_user);
  }

  public async updateUser(
    id: number,
    updateUser: UserDto.updateUser,
  ): Promise<UpdateResult> {
    updateUser.password = await this.encryptPassword(updateUser.password);
    const _user: User = await this.getUserWithRoleId(updateUser);
    return this.userRepo.update(id, _user);
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }

  private async encryptPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10;
    return await hash(plainTextPassword, saltRounds);
  }

  public async compareEncryptedPassword(
    plainTextPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return compare(plainTextPassword, encryptedPassword);
  }

  public async findOne(email: string): Promise<User | undefined> {
    return this.userRepo
      .createQueryBuilder('u')
      .select(['u.email', 'u.username', 'u.id', 'u.password'])
      .innerJoin('u.role', 'r')
      .addSelect(['r.roleName'])
      .where('u.email = :email', { email })
      .getOne();
  }

  public async getProfile(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: { id },
      select: ['email', 'username', 'id'],
    });
  }

  private async getUserWithRoleId(user: UserDto.createUser): Promise<User> {
    const { id: roleId } = await this.roleRepo.findOne({
      where: { roleName: user.role },
    });
    return {
      email: user.email,
      password: user.password,
      username: user.username,
      roleId,
    } as User;
  }
}
