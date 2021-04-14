import { CurrencyService } from '@src/controllers/germany'
import { redisClient } from '@src/clients/redis'

export interface CurrencyClient {
  getEurToBrl(): Promise<{ rate: number; timestamp: number }>
}

export class Currency implements CurrencyService {
  private currencyClient: CurrencyClient
  private redisInstance: redisClient

  constructor(currencyClient: CurrencyClient, redisInstance: redisClient) {
    this.currencyClient = currencyClient
    this.redisInstance = redisInstance
  }

  public async getEurToBrl(): Promise<number> {
    // await this.redisInstance.getEurToBrl()
    // const { rate } = await this.currencyClient.getEurToBrl()
    return 0
  }
}
