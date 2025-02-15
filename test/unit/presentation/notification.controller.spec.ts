import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../../../src/presentation/notification.controller';
import { NotificationService } from '../../../src/application/services/notification.service';

describe('NotificationController', () => {
  let controller: NotificationController;
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: { sendNotification: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    service = module.get<NotificationService>(NotificationService);
  });

  it('should send a notification', async () => {
    const message = 'Test message';
    await controller.sendNotification(message);
    expect(service.sendNotification).toHaveBeenCalledWith(message);
  });
});