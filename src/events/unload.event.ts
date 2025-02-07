import { DomainEvent } from './domain-event';
import { Cargo } from '../domain/cargo';
import { Ship } from '../domain/ship';

export class UnloadEvent extends DomainEvent {
  constructor(
    occurred: Date,
    private cargo: Cargo,
    public ship: Ship,
  ) {
    super(occurred);
  }

  process(): void {
    this.ship.handleUnload(this);
  }

  reverse(): void {
    this.ship.reverseUnload(this);
  }
}
