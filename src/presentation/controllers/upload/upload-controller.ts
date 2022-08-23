import { ok } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../login/login-controller.protocols'
import { Controller, FileUpload } from './upload-controller.protocols'

export class UploadController implements Controller {
  constructor (private readonly cloudnaryAdapter: FileUpload) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, tempFilePath, mimetype, size } = httpRequest.body.file
    const url = await this.cloudnaryAdapter.upload({ name, tempFilePath, mimetype, size })
    return ok({ url })
  }
}
