import { methodNotAllowed, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAccountInfo, Controller, HttpRequest, HttpResponse } from './add-account-info.protocols'

export class AddAccountInfoController implements Controller {
  constructor (private readonly addAccountInfo: AddAccountInfo) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
