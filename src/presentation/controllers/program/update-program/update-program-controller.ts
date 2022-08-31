import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddProgram, Controller, HttpRequest, HttpResponse } from './update-program-controller.protocols'

export class UpdateProgramController implements Controller {
  constructor (
    private readonly addProgram: AddProgram
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const programId = httpRequest.params.programId
      const { name, url, description, difficulty, duration, objective, equipment } = httpRequest.body
      const program = await this.addProgram.add({ name, url, description, difficulty, duration, objective, equipment }, programId)
      return ok(program)
    } catch (error) {
      return serverError(error)
    }
  }
}
