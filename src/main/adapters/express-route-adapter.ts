import { Controller, HttpRequest } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const routeAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    let body: any
    if (req.files) {
      body = req.files
    } else {
      body = req.body
    }
    const httpRequest: HttpRequest = {
      body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json(
        { error: httpResponse.body.message })
    }
  }
}
