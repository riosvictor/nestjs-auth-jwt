import { DomainEvent } from './domain-event';
import { Port } from '../domain/port';
import { Ship } from '../domain/ship';

export class ArrivalEvent extends DomainEvent {
  constructor(
    occurred: Date,
    private port: Port,
    private ship: Ship,
  ) {
    super(occurred);
  }

  process(): void {
    this.ship.handleArrival(this.port);
  }
}
