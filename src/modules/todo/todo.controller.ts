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
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Post()
  async create(@Body() body: TodoDto.createTodo, @Request() req) {
    return await this.todoService.createTodo({ ...body, userId: req.user.id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('content') content) {
    return await this.todoService.updateTodo({
      id,
      content,
    } as TodoDto.updateTodo);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.todoService.deleteTodo(id);
  }
}
