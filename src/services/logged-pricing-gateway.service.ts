import { Injectable } from '@nestjs/common';
import { PricingGatewayService } from './pricing-gateway.service';

interface GetPriceRequest {
  cargoName: string;
  price: number;
}

@Injectable()
export class LoggedPricingGatewayService {
  private log: GetPriceRequest[] = [];

  constructor(private readonly pricingGateway: PricingGatewayService) {}

  async getPrice(cargoName: string): Promise<number> {
    const existingRequest = this.log.find((req) => req.cargoName === cargoName);

    if (existingRequest) {
      return existingRequest.price;
    }

    const price = await this.pricingGateway.getPrice(cargoName);
    this.log.push({ cargoName, price });

    return price;
  }
}
