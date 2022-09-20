import { badRequest, methodNotAllowed, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAccountDetails, Controller, HttpRequest, HttpResponse, Validation } from './add-account-details-controller.protocols'

export class AddAccountDetailsController implements Controller {
  constructor (
    private readonly addAccountInfo: AddAccountDetails,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { accountId, birth, gender, height, objective, weight } = httpRequest.body
      const accountInfo = await this.addAccountInfo.add({ accountId, birth, gender, height, objective, weight })
      if (!accountInfo) {
        return methodNotAllowed()
      }
      return ok(accountInfo)
    } catch (error) {
      return serverError(error)
    }
  }
}
