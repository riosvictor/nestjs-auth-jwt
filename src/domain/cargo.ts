import { ArrivalEvent, LoadEvent } from '../events';
import { LoggedPricingGatewayService } from '../services/logged-pricing-gateway.service';
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
  #declaredValues: Record<string, number> = {};
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

  handleArrival(event: ArrivalEvent, pricingGateway?: LoggedPricingGatewayService): void {
    if (event.ship.port.country === Country.CANADA) {
      this.hasBeenInCanada = true;
    }

    event.priorCargoInCanada.set(this, this.hasBeenInCanada);
    
    if (pricingGateway){
      pricingGateway.getPrice(this.name)
        .then((price) => this.#declaredValues[this.name] = price);
    }
  }

  reverseArrival(event: ArrivalEvent): void {
    this.hasBeenInCanada = event.priorCargoInCanada.get(this) ?? false;
  }
}
