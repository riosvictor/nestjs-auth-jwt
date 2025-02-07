import { Injectable } from '@nestjs/common';
import { Port, Ship } from '../domain';
import { EventProcessorService } from '../services/event-processor.service';

@Injectable()
export class CustomsNotificationGateway {
  constructor(private readonly eventProcessor: EventProcessorService) {}

  notify(arrivalDate: Date, ship: Ship, port: Port) {
    if (this.eventProcessor.isActive) {
      this.sendToCustoms(this.buildArrivalMessage(arrivalDate, ship, port));
    }
  }

  private sendToCustoms(message: string) {
    console.log(`Sending to customs: ${message}`);
  }

  private buildArrivalMessage(arrivalDate: Date, ship: Ship, port: Port): string {
    return `Ship ${ship.name} arrived at ${port.name} on ${arrivalDate.toISOString()}`;
  }
}
