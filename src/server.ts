import './util/module-alias'
import { Server } from '@overnightjs/core'
import { Application } from 'express'
import * as http from 'http'
// import expressPino from 'express-pino-logger'
import cors from 'cors'
import logger from './logger'
import axios from 'axios'

import { GermanyController } from '@src/controllers/germany'
import { GermanyClient } from '@src/clients/germany'
import { FixerIoClient } from '@src/clients/fixer-io'
import { Germany } from '@src/services/germany'
import { Currency } from '@src/services/currency'

export class SetupServer extends Server {
  private server?: http.Server

  constructor() {
    super()
  }

  /*
   * We use a different method to init instead of using the constructor
   * this way we allow the server to be used in tests and normal initialization
   */
  public async init(): Promise<void> {
    this.setupExpress()
    this.setup()
  }

  private setupExpress(): void {
    // this.app.use(expressPino({ logger }))
    this.app.use(cors({ origin: '*' }))
  }

  private setup(): void {
    const axiosInstance = axios.create()

    const fixerIoClient = new FixerIoClient(axiosInstance, process.env.FIXER_IO_KEY || '')
    const germanyClient = new GermanyClient(axiosInstance)

    const germanyService = new Germany(germanyClient, fixerIoClient)
    const currencyService = new Currency(fixerIoClient)

    const germanyController = new GermanyController(germanyService, currencyService)

    this.addControllers([germanyController])
  }

  public getApp(): Application {
    return this.app
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err)
          }
          resolve(true)
        })
      })
    }
  }

  public start(): void {
    const port = Number(process.env.PORT || 8888)
    this.server = this.app.listen(port, '0.0.0.0', () => {
      logger.info('Server listening on port: ' + port)
    })
  }
}
