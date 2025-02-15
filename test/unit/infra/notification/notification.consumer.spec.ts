import { Test, TestingModule } from '@nestjs/testing';
import { NotificationConsumer } from '../../../../src/infra/notification/notification.consumer';
import { ConfigService } from '@nestjs/config';
import { SQSClient } from '@aws-sdk/client-sqs';

const mockUrl = 'http://localhost:4566/000000000000/notification-queue';

describe('NotificationConsumer', () => {
  let consumer: NotificationConsumer;
  let configService: ConfigService;
  let spySqsSend: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationConsumer,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
              .mockImplementation((key: string, defaultValue: string) => {
                if (key === 'AWS_REGION') return 'us-east-1';
                if (key === 'AWS_SQS_ENDPOINT') return 'http://localhost:4566';
                if (key === 'AWS_ACCESS_KEY_ID') return 'test';
                if (key === 'AWS_SECRET_ACCESS_KEY') return 'test';
                if (key === 'NOTIFICATION_QUEUE_URL') return mockUrl;
                return defaultValue;
              }),
          },
        },
      ],
    }).compile();

    consumer = module.get<NotificationConsumer>(NotificationConsumer);
    configService = module.get<ConfigService>(ConfigService);
    spySqsSend = jest.spyOn(SQSClient.prototype, 'send');
  });

  it('should initialize SQS client with config from ConfigService', () => {
    expect(configService.get).toHaveBeenCalledWith('AWS_REGION', 'us-east-1');
    expect(configService.get).toHaveBeenCalledWith('AWS_SQS_ENDPOINT', 'http://localhost:4566');
    expect(configService.get).toHaveBeenCalledWith('AWS_ACCESS_KEY_ID', 'test');
    expect(configService.get).toHaveBeenCalledWith('AWS_SECRET_ACCESS_KEY', 'test');
    expect(configService.get).toHaveBeenCalledWith('NOTIFICATION_QUEUE_URL', 'http://localhost:4566/000000000000/notification-queue');
  });

  it('should process received message', async () => {
    const mockMessage = { Body: 'test-message', ReceiptHandle: 'test-receipt-handle' };
    const mockSQSResponse = { Messages: [mockMessage] };
    
    spySqsSend
        .mockResolvedValueOnce(mockSQSResponse)
        .mockResolvedValue({});

    consumer['pollMessages']();

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(spySqsSend).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          QueueUrl: mockUrl,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 10
        }
      })
    );

    expect(spySqsSend).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          QueueUrl: mockUrl,
          ReceiptHandle: mockMessage.ReceiptHandle
        }
      })
    );
  });

  it('should call pollMessages method on module initialization', () => {
    const spyPollMessages = jest.spyOn(consumer as any, 'pollMessages');
    consumer.onModuleInit();
    expect(spyPollMessages).toHaveBeenCalled();
  });
});