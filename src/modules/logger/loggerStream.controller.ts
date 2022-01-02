import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { events } from 'src/utils/events';
import { LoggerService } from './logger.service';

@Controller()
export class LoggerStreamController {
  constructor(private readonly loggerService: LoggerService) {}
  @EventPattern(events.LOG)
  readMessage(data: any) {
    this.loggerService.insertLog(data.value);
  }
}
