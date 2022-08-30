import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddProgram, Controller, HttpRequest, HttpResponse, Validation } from './update-program-controller.protocols'

export class UpdateProgramController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProgram: AddProgram
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
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
