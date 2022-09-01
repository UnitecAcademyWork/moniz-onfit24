import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddWeek, Controller, HttpRequest, HttpResponse } from './update-week-controller.protocols'

export class UpdateWeekController implements Controller {
  constructor (
    private readonly addWeek: AddWeek
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const weekId = httpRequest.params.weekId
      const { goals, exercises } = httpRequest.body
      const week = await this.addWeek.add({ goals, exercises }, weekId)
      if (!week) {
        return forbidden(new InvalidParamError('programId'))
      }
      return ok(week)
    } catch (error) {
      return serverError(error)
    }
  }
}
