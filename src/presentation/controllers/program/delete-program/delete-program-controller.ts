import { Controller, DeleteProgram, HttpRequest, HttpResponse } from './delete-program-controller.protocols'

export class DeleteProgramController implements Controller {
  constructor (private readonly deleteProgram: DeleteProgram) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.deleteProgram.delete(httpRequest.params.programId)
    return null
  }
}
