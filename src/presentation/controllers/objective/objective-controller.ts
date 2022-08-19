import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { AddObjective, Controller, HttpRequest, HttpResponse, Validation } from './objective-controller.protocols'

export class ObjectiveController implements Controller {
  constructor (private readonly validation: Validation, private readonly addObjective: AddObjective) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, icon, description } = httpRequest.body
      await this.addObjective.add({ name, icon, description })
      return await Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
