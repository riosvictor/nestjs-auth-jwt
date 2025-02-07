import { DomainEvent } from './domain-event';
import { Port } from '../domain/port';
import { Ship } from '../domain/ship';
import { Cargo } from '../domain';

export class ArrivalEvent extends DomainEvent {
  priorCargoInCanada: Map<Cargo, boolean> = new Map();

  constructor(
    occurred: Date,
    public readonly port: Port,
    public readonly ship: Ship,
  ) {
    super(occurred);
  }

  process(): void {
    this.ship.handleArrival(this);
  }

  reverse(): void {
    this.ship.reverseArrival(this);
  }
}
