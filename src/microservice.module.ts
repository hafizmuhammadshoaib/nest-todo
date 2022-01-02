import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerStreamController } from './modules/logger/loggerStream.controller';

@Module({
  imports: [
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
  controllers: [LoggerStreamController],
  providers: [],
})
export class MicroServiceModule {}
