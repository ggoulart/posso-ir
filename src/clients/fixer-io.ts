import { AxiosInstance } from 'axios'
import { CurrencyClient } from '@src/services/currency'

interface FixerIoResp {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: { BRL: number }
}

export class FixerIoClient implements CurrencyClient {
  private request: AxiosInstance
  private apiKey: string

  constructor(request: AxiosInstance, apiKey: string) {
    this.request = request
    this.apiKey = apiKey
  }

  public async getEurToBrl(): Promise<{ rate: number; timestamp: number }> {
    return this.request
      .get<FixerIoResp>(`http://data.fixer.io/api/latest?access_key=${this.apiKey}&format=1`)
      .then((resp) => {
        if (resp.data.success) {
          return { rate: resp.data.rates.BRL, timestamp: resp.data.timestamp }
        } else {
          throw new Error('error to fetch currency info')
        }
      })
      .catch((err) => {
        console.log(err)
        throw new Error('error to fetch currency info')
      })
  }
}
