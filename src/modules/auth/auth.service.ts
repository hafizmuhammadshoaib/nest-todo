import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isPasswordCorrect = await this.userService.compareEncryptedPassword(
      pass,
      user?.password,
    );
    if (isPasswordCorrect) {
      const { email, username, id, role } = user;
      return { email, username, id, role };
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role.roleName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
