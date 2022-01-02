import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoRepository]),
    ClientsModule.register([
      {
        name: 'KAFKA_LOGGER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka-logger',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-logger-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
