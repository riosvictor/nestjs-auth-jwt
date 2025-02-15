import { Test, TestingModule } from '@nestjs/testing';
import { NotificationProducer } from '../../../../src/infra/notification/notification.producer';
import { ConfigService } from '@nestjs/config';
import { SQSClient } from '@aws-sdk/client-sqs';

describe('NotificationProducer', () => {
  let producer: NotificationProducer;
  let configService: ConfigService;
  let sqsClient: SQSClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationProducer,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
              .mockReturnValueOnce('test-region')
              .mockReturnValueOnce('test-endpoint')
              .mockReturnValueOnce('test-key')
              .mockReturnValueOnce('test-secret')
              .mockReturnValueOnce('test-queue-url')
          },
        },
      ],
    }).compile();

    producer = module.get<NotificationProducer>(NotificationProducer);
    configService = module.get<ConfigService>(ConfigService);
    sqsClient = producer['sqs'];
  });

  it('should initialize SQS client with config from ConfigService', () => {
    expect(configService.get).toHaveBeenCalledWith('AWS_REGION', 'us-east-1');
    expect(configService.get).toHaveBeenCalledWith('AWS_SQS_ENDPOINT', 'http://localhost:4566');
    expect(configService.get).toHaveBeenCalledWith('AWS_ACCESS_KEY_ID', 'test');
    expect(configService.get).toHaveBeenCalledWith('AWS_SECRET_ACCESS_KEY', 'test');
    expect(configService.get).toHaveBeenCalledWith('NOTIFICATION_QUEUE_URL', 'http://localhost:4566/000000000000/notification-queue');
  });

  it('should send notification message to SQS', async () => {
    const mockSQSClient = {
      send: jest.fn().mockResolvedValue({})
    };

    producer['sqs'] = mockSQSClient as any;

    const message = 'test-message';
    await producer.sendNotification(message);

    expect(mockSQSClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          QueueUrl: 'test-queue-url',
          MessageBody: JSON.stringify({ message }),
        }
      })
    );
  });
});