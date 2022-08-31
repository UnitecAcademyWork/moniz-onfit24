import { badRequest } from '@/presentation/helpers/http/http-helper'
import { AddWeek, Controller, HttpRequest, HttpResponse, Validation } from './add-week-controller.protocols'

export class AddWeekController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addWeek: AddWeek
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const weekId = httpRequest.params.weekId
    const { programId, goals, exercises } = httpRequest.body
    await this.addWeek.add({ programId, goals, exercises }, weekId)
    return null
  }
}
