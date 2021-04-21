import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import path from 'path'

@Controller('')
export class BaseController {
  @Get()
  public index(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'))
  }
}
