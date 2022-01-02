import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { events } from 'src/utils/events';

@Injectable()
export class KafkaService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafka-logger',
        brokers: ['localhost:9092'],
      },
      // consumer: {
      //   groupId: 'kafka-logger-consumer',
      // },
    },
  })
  public readonly client: ClientKafka;
  async onModuleInit() {
    [events.LOG].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }
}
