import { Country } from './country.enum';

export class Port {
  static readonly AT_SEA = new Port('At Sea', null);

  constructor(
    public readonly name: string,
    public readonly country: Country | null,
  ) {}
}
