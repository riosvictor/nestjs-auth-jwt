import { Module } from '@nestjs/common';
import { EventProcessorService } from './services/event.processor';


@Module({
  providers: [EventProcessorService],
  exports: [EventProcessorService],
})
export class AppModule {}
