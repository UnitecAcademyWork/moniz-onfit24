import { badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, FileUpload, HttpRequest, HttpResponse, Validation } from './upload-controller.protocols'

export class UploadController implements Controller {
  constructor (
    private readonly fileUpload: FileUpload,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (!error) {
      const { name, tempFilePath, mimetype, size } = httpRequest.body.file
      const url = await this.fileUpload.upload({ name, tempFilePath, mimetype, size })
      return ok({ url })
    }
    return badRequest(error)
  }
}
