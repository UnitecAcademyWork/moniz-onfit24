import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddProgram, Controller, HttpRequest, HttpResponse, Validation } from './add-program-controller.protocols'

export class AddProgramController implements Controller {
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
      const { name, description, url, difficulty, duration, objective, equipment } = httpRequest.body
      const program = await this.addProgram.add({ name, url, description, difficulty, duration, objective, equipment })
      return ok(program)
    } catch (error) {
      return serverError(error)
    }
  }
}
