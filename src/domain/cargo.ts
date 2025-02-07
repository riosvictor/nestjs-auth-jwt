import { ArrivalEvent, LoadEvent } from '../events';
import { Country } from './country.enum';
import { Port } from './port';
import { Ship } from './ship';

/**
 * Represents a cargo that can be loaded onto a ship.
 */
export class Cargo {
  #port: Port;
  #ship: Ship;
  #priorPort: Port;
  hasBeenInCanada = false;

  constructor(public readonly name: string) {}

  handleLoad(event: LoadEvent): void {
    this.#port = null;
    this.#ship = event.ship;
    this.#ship.handleLoad(event);
  }

  reverseLoad(event: LoadEvent): void {
    this.#ship?.reverseLoad(event);
    this.#ship = null;
  }

  handleArrival(event: ArrivalEvent): void {
    if (event.ship.port.country === Country.CANADA) {
      this.hasBeenInCanada = true;
    }

    event.priorCargoInCanada.set(this, this.hasBeenInCanada);
  }

  reverseArrival(event: ArrivalEvent): void {
    this.hasBeenInCanada = event.priorCargoInCanada.get(this) ?? false;
  }
}
