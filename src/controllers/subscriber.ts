import { Controller, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import webpush from 'web-push'
import logger from '@src/logger'

@Controller('subscribe')
export class SubscriberController {
  constructor() {
    const publicKey = process.env.VAPID_PUBLIC_KEY ||  ''
    const privateKey = process.env.VAPID_PRIVATE_KEY || ''
    webpush.setVapidDetails('mailto:sometest@testguga.com', publicKey, privateKey)
  }

  @Post()
  public subscriber(req: Request, res: Response): void {
    const subscription = req.body
    console.log(subscription)

    res.sendStatus(201)

    const payload = JSON.stringify({
      title: 'some nice title',
      body: "Posso ir?",
    })

    webpush.sendNotification(subscription, payload).catch((err) => logger.error(err))
  }
}
