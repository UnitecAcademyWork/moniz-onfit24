import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, DeleteProgramWeek, HttpRequest, HttpResponse, Validation } from './delete-program-week.protocols'

export class DeleteProgramWeekController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteProgramWeek: DeleteProgramWeek
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { programId, weekId } = httpRequest.body
      const program = await this.deleteProgramWeek.deleteAssociation(programId, weekId)
      if (!program) {
        return forbidden(new InvalidParamError('programId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
