import './util/module-alias'
import { Server } from '@overnightjs/core'
import { Application } from 'express'
import * as http from 'http'
// import expressPino from 'express-pino-logger'
import cors from 'cors'
import logger from './logger'
import { GermanyController } from '@src/controllers/germany'
import axios from 'axios'
import { GermanyClient } from '@src/clients/germanyClient'

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
    const germanyClient = new GermanyClient(axiosInstance)
    const germanyController = new GermanyController(germanyClient)
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
    const port = Number(process.env.PORT)
    this.server = this.app.listen(port, '0.0.0.0', () => {
      logger.info('Server listening on port: ' + port)
    })
  }
}