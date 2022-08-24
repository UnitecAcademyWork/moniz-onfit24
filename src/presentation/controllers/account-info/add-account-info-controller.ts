import { AddAccountInfo, Controller, HttpRequest, HttpResponse } from './add-account-info.protocols'

export class AddAccountInfoController implements Controller {
  constructor (private readonly addAccountInfo: AddAccountInfo) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { birth, gender, height, objective, weight } = httpRequest.body
    await this.addAccountInfo.add({ birth, gender, height, objective, weight })
    return null
  }
}
