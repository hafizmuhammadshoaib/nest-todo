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
import { KafkaService } from '../kafka/kafka.service';
import { Role } from '../user/role.enum';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly kafkaService: KafkaService,
  ) {}
  @Get()
  async getTodos(@Request() req) {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'todo.getTodos',
      timestamp: new Date(),
      user: req.user,
    });

    if (req.user.role === Role.ADMIN) {
      return await this.todoService.findAll();
    }
    return await this.todoService.findByUserId(req.user.id);
  }

  @Post()
  async create(@Body() body: TodoDto.createTodo, @Request() req) {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'todo.create',
      timestamp: new Date(),
    });

    return await this.todoService.createTodo({ ...body, userId: req.user.id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('content') content) {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'todo.update',
      timestamp: new Date(),
    });

    return await this.todoService.updateTodo({
      id,
      content,
    } as TodoDto.updateTodo);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.kafkaService.client.emit<number>(events.LOG, {
      activity: 'todo.remove',
      timestamp: new Date(),
    });

    return await this.todoService.deleteTodo(id);
  }
}
