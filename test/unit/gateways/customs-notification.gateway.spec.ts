import { Test, TestingModule } from '@nestjs/testing';
import { CustomsNotificationGateway } from '../../../src/gateways/customs-notification.gateway';
import { EventProcessorService } from '../../../src/services/event-processor.service';

describe('CustomsNotificationGateway', () => {
  let gateway: CustomsNotificationGateway;
  let eventProcessor: EventProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomsNotificationGateway,
        {
          provide: EventProcessorService,
          useValue: { isActive: false }, // Mock inicial com isActive falso
        },
      ],
    }).compile();

    gateway = module.get<CustomsNotificationGateway>(CustomsNotificationGateway);
    eventProcessor = module.get<EventProcessorService>(EventProcessorService);
  });

  it('não deve enviar notificação quando o processador não está ativo', () => {
    const sendToCustomsSpy = jest.spyOn<any, any>(gateway, 'sendToCustoms');

    gateway.notify(new Date(), { name: 'Titanic' } as any, { name: 'NY Port' } as any);

    expect(sendToCustomsSpy).not.toHaveBeenCalled();
  });

  it('deve enviar notificação quando o processador está ativo', () => {
    eventProcessor.isActive = true; // Simula processador ativo
    const sendToCustomsSpy = jest.spyOn<any, any>(gateway, 'sendToCustoms');

    gateway.notify(new Date(), { name: 'Titanic' } as any, { name: 'NY Port' } as any);

    expect(sendToCustomsSpy).toHaveBeenCalledTimes(1);
  });

  it('deve construir a mensagem corretamente', () => {
    const arrivalDate = new Date('2024-02-06T12:00:00Z');
    const message = (gateway as any).buildArrivalMessage(arrivalDate, { name: 'Titanic' } as any, { name: 'NY Port' } as any);

    expect(message).toBe('Ship Titanic arrived at NY Port on 2024-02-06T12:00:00.000Z');
  });
});
