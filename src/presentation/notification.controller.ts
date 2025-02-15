import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from '../application/services/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendNotification(@Body('message') message: string) {
    await this.notificationService.sendNotification(message);
    return { status: 'Message sent successfully' };
  }
}