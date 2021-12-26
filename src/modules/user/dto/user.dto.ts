import { IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from '../role.enum';

export namespace UserDto {
  export class createUser {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEnum(Role)
    role: string;
  }

  export class updateUser extends createUser {}
}
