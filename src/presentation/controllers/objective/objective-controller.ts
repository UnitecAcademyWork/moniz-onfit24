import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './objective-controller.protocols'

export class ObjectiveController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      return await Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
