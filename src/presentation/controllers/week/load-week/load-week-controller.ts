import { Controller, HttpRequest, HttpResponse, LoadWeekById } from './load-week-controller.protocols'

export class LoadWeekController implements Controller {
  constructor (private readonly loadWeekById: LoadWeekById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadWeekById.loadById(httpRequest.params.weekId)
    return Promise.resolve(null)
  }
}
