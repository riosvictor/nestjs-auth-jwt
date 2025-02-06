import { DomainEvent } from './domain-event';
import { Cargo } from '../domain/cargo';
import { Ship } from '../domain/ship';

export class LoadEvent extends DomainEvent {
  constructor(
    occurred: Date,
    private cargo: Cargo,
    private ship: Ship,
  ) {
    super(occurred);
  }

  process(): void {
    this.ship.loadCargo(this.cargo);
  }
}
