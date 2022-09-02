import { AddWeekToProgram, Controller, HttpRequest, HttpResponse } from './add-week-to-program-controller.protocols'

export class AddWeekToProgramController implements Controller {
  constructor (private readonly addWeekToProgram: AddWeekToProgram) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { programId, weekId } = httpRequest.body
    await this.addWeekToProgram.associate(programId, weekId)
    return null
  }
}
