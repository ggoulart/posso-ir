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

      const defaultResp = `<html><body><div style='text-align:center;'><h1>Consigo fazer agendamentos: ${appointment}</h1><h1>Data do travel ban: ${travelBan}</h1></div></body></html>`

      res.status(200).send(defaultResp)
    } catch (e) {
      logger.error(e)
      res.sendStatus(500)
    }
  }
}