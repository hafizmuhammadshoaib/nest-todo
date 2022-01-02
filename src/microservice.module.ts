import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: 'http://localhost:9200',
      }),
    }),
    LoggerModule,
  ],

  controllers: [],
  providers: [],
})
export class MicroServiceModule {}
