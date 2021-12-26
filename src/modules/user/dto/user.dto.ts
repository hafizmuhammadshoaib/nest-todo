import { IsNumber, IsString, MinLength } from 'class-validator';

export namespace UserDto {
  export class createUser {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
  }

  export class updateUser extends createUser {}
}
