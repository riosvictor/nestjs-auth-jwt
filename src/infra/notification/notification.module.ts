import { Module } from '@nestjs/common';
import { NotificationService } from '../../application/services/notification.service';
import { NotificationProducer } from './notification.producer';
import { NotificationConsumer } from './notification.consumer';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from '../../presentation/notification.controller';

@Module({
  imports: [ConfigModule],
  providers: [NotificationService, NotificationProducer, NotificationConsumer],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}