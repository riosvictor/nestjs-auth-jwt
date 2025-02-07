import { ArrivalEvent } from '../events';
import { CustomsNotificationGateway } from '../gateways/customs-notification.gateway';
import { Country } from './country.enum';

export class Port {
  static readonly AT_SEA = new Port('At Sea', null);

  constructor(
    public name: string,
    public country: Country,
    private customsGateway?: CustomsNotificationGateway
  ) {}

  handleArrival(event: ArrivalEvent) {
    event.ship.port = this;
    
    this.customsGateway?.notify(event.occurred, event.ship, this);
  }
}
