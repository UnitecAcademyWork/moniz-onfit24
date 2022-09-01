import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadWeeks } from './load-weeks-controller.protocols'

export class LoadWeeksController implements Controller {
  constructor (private readonly loadWeeks: LoadWeeks) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const weeks = await this.loadWeeks.loadAll()
      return weeks.length ? ok(weeks) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
