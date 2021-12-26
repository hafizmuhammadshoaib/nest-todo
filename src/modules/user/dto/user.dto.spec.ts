import { TodoDto } from './user.dto';

describe('TodoDto', () => {
  it('should be defined', () => {
    expect(new TodoDto()).toBeDefined();
  });
});
