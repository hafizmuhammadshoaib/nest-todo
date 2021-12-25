import { IsNumber, IsString } from 'class-validator';

export namespace TodoDto {
  export class createTodo {
    @IsString()
    content: string;
  }

  export class updateTodo {
    @IsString()
    content: string;
    @IsNumber()
    id: number;
  }
}
