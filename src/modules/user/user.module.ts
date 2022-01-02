import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
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
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
