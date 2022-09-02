import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { AddWeekToProgram, Controller, HttpRequest, HttpResponse } from './add-week-to-program-controller.protocols'

export class AddWeekToProgramController implements Controller {
  constructor (private readonly addWeekToProgram: AddWeekToProgram) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { programId, weekId } = httpRequest.body
    const program = await this.addWeekToProgram.associate(programId, weekId)
    if (!program) {
      return forbidden(new InvalidParamError('invalidId'))
    }
  }
}
