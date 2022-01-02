import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerService } from './logger.service';
import { LoggerStreamController } from './loggerStream.controller';

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
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: 'http://localhost:9200',
      }),
    }),
  ],

  controllers: [LoggerStreamController],
  providers: [LoggerService],
})
export class LoggerModule {}
