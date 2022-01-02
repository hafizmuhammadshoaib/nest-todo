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
import { Role } from '../user/role.enum';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  @Inject('KAFKA_LOGGER_SERVICE') private readonly client: ClientKafka;
  async onModuleInit() {
    [events.LOG].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getTodos(@Request() req) {
    this.client.emit<number>(events.LOG, {
      activity: 'todo.getTodos',
      message: new Date(),
      user: req.user,
    });

    if (req.user.role === Role.ADMIN) {
      return await this.todoService.findAll();
    }
    return await this.todoService.findByUserId(req.user.id);
  }

  @Post()
  async create(@Body() body: TodoDto.createTodo, @Request() req) {
    this.client.emit<number>(events.LOG, {
      activity: 'todo.create',
      message: new Date(),
    });

    return await this.todoService.createTodo({ ...body, userId: req.user.id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('content') content) {
    this.client.emit<number>(events.LOG, {
      activity: 'todo.update',
      message: new Date(),
    });

    return await this.todoService.updateTodo({
      id,
      content,
    } as TodoDto.updateTodo);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.client.emit<number>(events.LOG, {
      activity: 'todo.remove',
      message: new Date(),
    });

    return await this.todoService.deleteTodo(id);
  }
}
