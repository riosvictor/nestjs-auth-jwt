import { Injectable } from '@nestjs/common';

@Injectable()
export class PricingGatewayService {
  async getPrice(cargoId: string): Promise<number> {
    // Simula a chamada ao sistema externo de precificação
    return Math.random() * 1000; // Valor fictício
  }
}
