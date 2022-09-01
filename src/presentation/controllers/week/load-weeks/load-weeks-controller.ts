import { Controller, HttpRequest, HttpResponse, LoadWeeks } from './load-weeks-controller.protocols'

export class LoadWeeksController implements Controller {
  constructor (private readonly loadWeeks: LoadWeeks) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadWeeks.loadAll()
    return null
  }
}
