import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddProgram, Controller, HttpRequest, HttpResponse } from './update-program-controller.protocols'

export class UpdateProgramController implements Controller {
  constructor (
    private readonly addProgram: AddProgram
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const programId = httpRequest.params.programId
      const { name, description, difficulty, duration, objective, equipment } = httpRequest.body
      const program = await this.addProgram.add({ name, description, difficulty, duration, objective, equipment }, programId)
      if (!program) {
        return forbidden(new InvalidParamError('programId'))
      }
      return ok(program)
    } catch (error) {
      return serverError(error)
    }
  }
}
