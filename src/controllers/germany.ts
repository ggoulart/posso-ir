import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { GermanyClient } from '@src/clients/germanyClient'
import logger from '@src/logger'

@Controller('')
export class GermanyController {
  private germanyClient: GermanyClient

  constructor(germanyClient: GermanyClient) {
    this.germanyClient = germanyClient
  }

  @Get('')
  public async canIGo(req: Request, res: Response): Promise<void> {
    try {
      const appointment = await this.germanyClient.fetchPoaAppointment()
      const travelBan = await this.germanyClient.fetchTravelBan()

      console.log(appointment)
      console.log(travelBan)
      res.sendStatus(200)
    } catch (e) {
      logger.error(e)
      res.sendStatus(500)
    }
  }
}