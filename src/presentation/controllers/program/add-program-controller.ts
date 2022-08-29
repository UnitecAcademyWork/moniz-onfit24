import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../account-info/add-account-info-controller.protocols'
import { AddProgram, Controller, Validation } from './add-program-controller.protocols'

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
      const { name, description, difficulty, duration, objective } = httpRequest.body
      const program = await this.addProgram.add({ name, description, difficulty, duration, objective })
      return ok(program)
    } catch (error) {
      return serverError(error)
    }
  }
}
