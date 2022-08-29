import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadProgramById } from './load-program-controller.protocols'

export class LoadProgramController implements Controller {
  constructor (private readonly loadProgramById: LoadProgramById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const program = await this.loadProgramById.loadById(httpRequest.params.programId)
      if (!program) {
        return forbidden(new InvalidParamError('programId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
