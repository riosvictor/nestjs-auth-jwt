import { Module } from '@nestjs/common';
import { EventProcessorService } from './services/event-processor.service';


@Module({
  providers: [EventProcessorService],
  exports: [EventProcessorService],
})
export class AppModule {}
