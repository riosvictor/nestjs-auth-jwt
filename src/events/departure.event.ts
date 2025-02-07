import { DomainEvent } from './domain-event';
import { Ship } from '../domain/ship';

export class DepartureEvent extends DomainEvent {
  constructor(
    occurred: Date,
    public ship: Ship,
  ) {
    super(occurred);
  }

  process(): void {
    this.ship.handleDeparture();
  }

  reverse(): void {
    this.ship.reverseDeparture(this);
  }
}
