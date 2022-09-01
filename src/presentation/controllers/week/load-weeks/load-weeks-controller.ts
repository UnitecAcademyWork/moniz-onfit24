import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadWeeks } from './load-weeks-controller.protocols'

export class LoadWeeksController implements Controller {
  constructor (private readonly loadWeeks: LoadWeeks) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const weeks = await this.loadWeeks.loadAll()
    return ok(weeks)
  }
}
