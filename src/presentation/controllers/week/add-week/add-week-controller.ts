import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
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
      const { goals, exercises } = httpRequest.body
      const week = await this.addWeek.add({ goals, exercises })
      return ok(week)
    } catch (error) {
      return serverError(error)
    }
  }
}
