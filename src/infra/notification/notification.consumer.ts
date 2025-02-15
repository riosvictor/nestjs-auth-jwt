import { Injectable, OnModuleInit } from '@nestjs/common';
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationConsumer implements OnModuleInit {
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

  async onModuleInit() {
    this.pollMessages();
  }

  private async pollMessages() {
    const onTesting = process.env.NODE_ENV === 'test';

    while (true) {
      const response = await this.sqs.send(
        new ReceiveMessageCommand({ QueueUrl: this.queueUrl, MaxNumberOfMessages: 1, WaitTimeSeconds: 10 }),
      );

      const messages = response?.Messages;
      
      if (messages) {
        for (const message of messages) {
          console.log('Received:', message.Body);
          await this.sqs.send(new DeleteMessageCommand({ QueueUrl: this.queueUrl, ReceiptHandle: message.ReceiptHandle }));
        }
      }

      if (onTesting) break;
    }
  }
}