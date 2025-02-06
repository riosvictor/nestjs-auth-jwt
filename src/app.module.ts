import { Module } from '@nestjs/common';
import { EventProcessor } from './events/event.processor';


@Module({
  providers: [EventProcessor],
  exports: [EventProcessor],
})
export class AppModule {}
