import { LoadProgramWeeks } from '@/domain/usecases/program/load-program-weeks'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from './load-program-weeks-controller.protocols'

export class LoadProgramWeeksController implements Controller {
  constructor (private readonly loadProgramWeeks: LoadProgramWeeks) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const program = await this.loadProgramWeeks.loadWeeks(httpRequest.params.programId)
      if (!program) {
        return forbidden(new InvalidParamError('programId'))
      }
      return ok(program)
    } catch (error) {
      return serverError(error)
    }
  }
}
