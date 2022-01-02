import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class LoggerService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async insertLog(data: any) {
    this.elasticsearchService.index({
      index: 'log',
      body: data,
    });
  }
}
