import { Injectable } from '@nestjs/common';
import { DomainEvent } from '../events';

@Injectable()
export class EventProcessorService {
  private log: DomainEvent[] = [];
  isActive = true;

  process(event: DomainEvent, isActive: boolean = true): void {
    this.isActive = isActive;
    event.process();
    this.log.push(event);
  }

  getEventLog(): DomainEvent[] {
    return this.log;
  }
}
