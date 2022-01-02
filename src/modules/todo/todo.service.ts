import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepo: TodoRepository) {}
  public findAll(): Promise<Todo[]> {
    return this.todoRepo.find({ select: ['content', 'id'] });
  }

  public findByUserId(userId: number): Promise<Todo[]> {
    return this.todoRepo.find({ where: { userId }, select: ['content', 'id'] });
  }

  public createTodo(
    todo: TodoDto.createTodo & { userId: number },
  ): Promise<InsertResult> {
    return this.todoRepo.insert(todo);
  }

  public async updateTodo(
    updateTodo: TodoDto.updateTodo,
  ): Promise<UpdateResult> {
    const updatedTodo: QueryDeepPartialEntity<Todo> = {
      content: updateTodo.content,
    };
    return this.todoRepo.update(updateTodo.id, updatedTodo);
  }

  public async deleteTodo(id: number): Promise<DeleteResult> {
    return this.todoRepo.delete(id);
  }
}
