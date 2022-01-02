import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { events } from 'src/utils/events';
import { Roles } from 'src/utils/role-decorator';
import { UserDto } from './dto/user.dto';
import { Role } from './role.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject('KAFKA_LOGGER_SERVICE') private readonly client: ClientKafka;
  async onModuleInit() {
    [events.LOG].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }

  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll() {
    this.client.emit<number>(events.LOG, {
      activity: 'user.findAll',
      message: new Date(),
    });

    return await this.userService.findAll();
  }

  @Get('profile')
  async profile(@Request() req) {
    this.client.emit<number>(events.LOG, {
      activity: 'user.profile',
      message: new Date(),
    });

    return this.userService.getProfile(req.user.id);
  }

  @Post()
  async create(@Body() body: UserDto.createUser) {
    this.client.emit<number>(events.LOG, {
      activity: 'user.create',
      message: new Date(),
    });

    await this.userService.createUser(body);
    return;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UserDto.updateUser) {
    this.client.emit<number>(events.LOG, {
      activity: 'user.update',
      message: new Date(),
    });

    return await this.userService.updateUser(id, user);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.client.emit<number>(events.LOG, {
      activity: 'user.remove',
      message: new Date(),
    });

    return await this.userService.deleteUser(id);
  }
}
