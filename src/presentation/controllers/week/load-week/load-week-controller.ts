import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadWeekById } from './load-week-controller.protocols'

export class LoadWeekController implements Controller {
  constructor (private readonly loadWeekById: LoadWeekById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const week = await this.loadWeekById.loadById(httpRequest.params.weekId)
    if (!week) {
      return forbidden(new InvalidParamError('weekId'))
    }
    return null
  }
}
