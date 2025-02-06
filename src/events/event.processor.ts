import { Injectable } from '@nestjs/common';
import { DomainEvent } from './domain-event';

@Injectable()
export class EventProcessor {
  private log: DomainEvent[] = [];

  process(event: DomainEvent): void {
    event.process();
    this.log.push(event);
  }

  getEventLog(): DomainEvent[] {
    return this.log;
  }
}
