import { badRequest, methodNotAllowed, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAccountInfo, Controller, HttpRequest, HttpResponse, Validation } from './add-account-info-controller.protocols'

export class AddAccountInfoController implements Controller {
  constructor (
    private readonly addAccountInfo: AddAccountInfo,
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
