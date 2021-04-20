import { CurrencyService } from '@src/controllers/germany'

export interface CurrencyClient {
  getEurToBrl(): Promise<{ rate: number; timestamp: number }>
}

export class Currency implements CurrencyService {
  private currencyClient: CurrencyClient

  constructor(currencyClient: CurrencyClient) {
    this.currencyClient = currencyClient
  }

  public async getEurToBrl(): Promise<number> {
    // await this.redisInstance.getEurToBrl()
    // const { rate } = await this.currencyClient.getEurToBrl()
    return 0
  }
}
