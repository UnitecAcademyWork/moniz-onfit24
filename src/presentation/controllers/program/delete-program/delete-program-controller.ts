import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, DeleteProgram, HttpRequest, HttpResponse } from './delete-program-controller.protocols'

export class DeleteProgramController implements Controller {
  constructor (private readonly deleteProgram: DeleteProgram) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const program = await this.deleteProgram.delete(httpRequest.params.programId)
      if (!program) {
        return forbidden(new InvalidParamError('programa inválido'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
