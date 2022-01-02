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
import { events } from 'src/utils/events';
import { Roles } from 'src/utils/role-decorator';
import { KafkaService } from '../kafka/kafka.service';
import { UserDto } from './dto/user.dto';
import { Role } from './role.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly kafkaService: KafkaService,
  ) {}
  @Get()
  async findAll() {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'user.findAll',
      timestamp: new Date(),
    });

    return await this.userService.findAll();
  }

  @Get('profile')
  async profile(@Request() req) {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'user.profile',
      timestamp: new Date(),
    });

    return this.userService.getProfile(req.user.id);
  }

  @Post()
  async create(@Body() body: UserDto.createUser) {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'user.create',
      timestamp: new Date(),
    });

    await this.userService.createUser(body);
    return;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UserDto.updateUser) {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'user.update',
      timestamp: new Date(),
    });

    return await this.userService.updateUser(id, user);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'user.remove',
      timestamp: new Date(),
    });

    return await this.userService.deleteUser(id);
  }
}
