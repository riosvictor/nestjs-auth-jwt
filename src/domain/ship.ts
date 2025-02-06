import { Port } from './port';
import { Cargo } from './cargo';

export class Ship {
  private cargo: Cargo[] = [];

  constructor(
    public readonly name: string,
    public port: Port,
  ) {}

  handleArrival(port: Port): void {
    this.port = port;
    this.cargo.forEach((cargo) => cargo.handleArrival(port));
  }

  handleDeparture(): void {
    this.port = Port.AT_SEA;
  }

  loadCargo(cargo: Cargo): void {
    this.cargo.push(cargo);
  }

  unloadCargo(cargo: Cargo): void {
    this.cargo = this.cargo.filter((c) => c !== cargo);
  }
}
