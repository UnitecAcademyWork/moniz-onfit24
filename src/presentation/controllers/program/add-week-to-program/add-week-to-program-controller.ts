import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddWeekToProgram, Controller, HttpRequest, HttpResponse, Validation } from './add-week-to-program-controller.protocols'

export class AddWeekToProgramController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addWeekToProgram: AddWeekToProgram
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { programId, weekId } = httpRequest.body
      const program = await this.addWeekToProgram.associate(programId, weekId)
      if (!program) {
        return forbidden(new InvalidParamError('invalidId'))
      }
      return ok(program)
    } catch (error) {
      return serverError(error)
    }
  }
}
