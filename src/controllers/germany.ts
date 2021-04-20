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

  @Get('')
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

      res.status(200).send({appointment, travelBan, rate})
    } catch (e) {
      logger.error(e)
      res.sendStatus(500)
    }
  }

  private static canIGoResp(appointment: boolean, travelBan: string, rate: number): string {
    return `<html>
      <body>
        <div style='text-align:center;'>
          <h1>Consigo fazer agendamentos: ${appointment}</h1>
          <h1>Data do travel ban: ${travelBan}</h1>
          <h1>Euro: ${rate}</h1>
        </div>
      </body>
    </html>`
  }
}
