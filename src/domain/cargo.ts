import { Port } from './port';

export class Cargo {
  hasBeenInCanada = false;

  constructor(public readonly name: string) {}

  handleArrival(port: Port): void {
    if (port.country === 'Canada') {
      this.hasBeenInCanada = true;
    }
  }
}
