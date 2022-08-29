import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../account-info/add-account-info-controller.protocols'
import { Controller, Validation } from './add-program-controller.protocols'

export class AddProgramController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return Promise.resolve(null)
  }
}
