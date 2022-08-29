import { Controller, HttpRequest, HttpResponse, LoadProgramById } from './load-program-controller.protocols'

export class LoadProgramController implements Controller {
  constructor (private readonly loadProgramById: LoadProgramById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadProgramById.loadById(httpRequest.params.programId)
    return null
  }
}
