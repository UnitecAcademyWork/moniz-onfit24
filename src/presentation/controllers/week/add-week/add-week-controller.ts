import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddWeek, Controller, HttpRequest, HttpResponse, Validation } from './add-week-controller.protocols'

export class AddWeekController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addWeek: AddWeek
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { programId, goals, exercises } = httpRequest.body
      const week = await this.addWeek.add({ programId, goals, exercises })
      if (!week) {
        return forbidden(new InvalidParamError('programId'))
      }
      return ok(week)
    } catch (error) {
      return serverError(error)
    }
  }
}
