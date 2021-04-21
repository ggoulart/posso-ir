import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import logger from '@src/logger'

export interface CountryService {
  travelInfo(): Promise<{ appointment: boolean; travelBan: string }>
}

export interface CurrencyService {
  getEurToBrl(): Promise<number>
}

@Controller('germany')
export class GermanyController {
  private germanyService: CountryService
  private currencyService: CurrencyService

  constructor(germanyService: CountryService, currencyService: CurrencyService) {
    this.germanyService = germanyService
    this.currencyService = currencyService
  }

  @Get()
  public async canIGo(req: Request, res: Response): Promise<void> {
    try {
      const { appointment, travelBan } = await this.germanyService
        .travelInfo()
        .then(({ appointment, travelBan }) => {
          return { appointment, travelBan }
        })
        .catch(() => {
          return { appointment: false, travelBan: 'Não sei :/' }
        })
      const rate = await this.currencyService
        .getEurToBrl()
        .then((value) => {
          return value
        })
        .catch(() => {
          return 0
        })

      res.status(200).setHeader('Content-Type', 'application/json')
      res.send({ appointment, travelBan, rate })
    } catch (e) {
      logger.error(e)
      res.sendStatus(500)
    }
  }
}
