import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { Roles } from 'src/utils/role-decorator';
import { UserDto } from './dto/user.dto';
import { Role } from './role.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('profile')
  async profile(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() body: UserDto.createUser) {
    await this.userService.createUser(body);
    return;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UserDto.updateUser) {
    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
