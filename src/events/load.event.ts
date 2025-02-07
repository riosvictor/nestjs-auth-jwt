import { DomainEvent } from './domain-event';
import { Cargo } from '../domain/cargo';
import { Ship } from '../domain/ship';
import { Port } from '../domain';

export class LoadEvent extends DomainEvent {
  priorPort: Port;
  
  constructor(
    occurred: Date,
    public readonly cargo: Cargo,
    public readonly ship: Ship,
  ) {
    super(occurred);
  }

  process(): void {
    this.ship.handleLoad(this);
  }

  reverse(): void {
    this.ship.reverseLoad(this);
  }
}
