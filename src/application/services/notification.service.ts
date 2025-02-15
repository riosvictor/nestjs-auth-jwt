import { Injectable } from '@nestjs/common';
import { NotificationProducer } from '../../infra/notification/notification.producer';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationProducer: NotificationProducer) {}

  async sendNotification(message: string) {
    await this.notificationProducer.sendNotification(message);
  }
}