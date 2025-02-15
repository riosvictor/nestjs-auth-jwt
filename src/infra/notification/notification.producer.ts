import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationProducer {
  private sqs: SQSClient;
  private queueUrl: string;

  constructor(private configService: ConfigService) {
    this.sqs = new SQSClient({
      region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
      endpoint: this.configService.get<string>('AWS_SQS_ENDPOINT', 'http://localhost:4566'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', 'test'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY', 'test'),
      }
    });
    this.queueUrl = this.configService.get<string>('NOTIFICATION_QUEUE_URL', 'http://localhost:4566/000000000000/notification-queue');
  }

  async sendNotification(message: string) {
    await this.sqs.send(
      new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify({ message }),
      }),
    );
  }
}