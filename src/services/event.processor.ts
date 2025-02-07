import { Injectable } from '@nestjs/common';
import { DomainEvent } from '../events';

@Injectable()
export class EventProcessorService {
  private log: DomainEvent[] = [];
  isActive = false;

  process(event: DomainEvent, isActive: boolean = true): void {
    this.isActive = isActive;
    event.process();
    this.log.push(event);
  }

  reverse(event: DomainEvent): void {
    event.reverse();
  }

  getEventLog(): DomainEvent[] {
    return this.log;
  }
}
