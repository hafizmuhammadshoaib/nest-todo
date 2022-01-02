import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { events } from 'src/utils/events';

@Controller()
export class LoggerStreamController {
  @EventPattern(events.LOG)
  readMessage(data: any) {
    // TODO: will add elastic search here
    console.log({ message: data.value });
  }
}
