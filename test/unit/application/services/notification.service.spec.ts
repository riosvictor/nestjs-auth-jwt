import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../../../../src/application/services/notification.service';
import { NotificationProducer } from '../../../../src/infra/notification/notification.producer';

describe('NotificationService', () => {
  let service: NotificationService;
  let producer: NotificationProducer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: NotificationProducer,
          useValue: { sendNotification: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    producer = module.get<NotificationProducer>(NotificationProducer);
  });

  it('should send a notification', async () => {
    const message = 'Test message';
    await service.sendNotification(message);
    expect(producer.sendNotification).toHaveBeenCalledWith(message);
  });
});