import { Port } from './port';
import { Cargo } from './cargo';
import { ArrivalEvent, DepartureEvent, LoadEvent, UnloadEvent } from '../events';
import { Country } from './country.enum';

/**
 * Represents a ship that can carry cargo.
 */
export class Ship {
  private cargoList: Cargo[] = [];
  #priorPort: Port;

  constructor(
    public readonly name: string,
    public port: Port,
  ) {}

  handleLoad(event: LoadEvent): void {
    this.cargoList.push(event.cargo);
    this.#priorPort = event.priorPort;
  }

  reverseLoad(event: LoadEvent): void {
    this.cargoList = this.cargoList.filter((c) => !event.ship.cargoList.includes(c));
    this.#priorPort = event.priorPort;
  }

  handleArrival(event: ArrivalEvent): void {
    this.#priorPort = event.ship.port;
    this.port = event.port;
    
    this.cargoList.forEach((c) => {
      if (this.port.country === Country.CANADA) {
        c.hasBeenInCanada = true;
      }
    });
  }

  reverseArrival(event: ArrivalEvent): void {
    this.port = event.ship.#priorPort;
    this.#priorPort = undefined;
  }

  handleDeparture(): void {
    this.#priorPort = this.port;
    this.port = Port.AT_SEA;
  }

  reverseDeparture(event: DepartureEvent): void {
    event.ship.port = this.#priorPort;
  }

  handleUnload(event: UnloadEvent): void {
    this.cargoList = this.cargoList.filter((c) => !event.ship.cargoList.includes(c));
  }

  reverseUnload(event: UnloadEvent): void {
    this.cargoList.push(...event.ship.cargoList);
  }  
}
