import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadAccountDetailsById } from './load-account-details-controller.protocols'

export class LoadAccountDetailsController implements Controller {
  constructor (private readonly loadAccountDetailsById: LoadAccountDetailsById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accountId = httpRequest.params.accountId
      const accountDetails = await this.loadAccountDetailsById.load(accountId)
      if (!accountDetails) {
        return forbidden(new InvalidParamError('user inválido'))
      }
      return ok(accountDetails)
    } catch (error) {
      return serverError(error)
    }
  }
}
