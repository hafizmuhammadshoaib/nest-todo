import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let provider: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    provider = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
