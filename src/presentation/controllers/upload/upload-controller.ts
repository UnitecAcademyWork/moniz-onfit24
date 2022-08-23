import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, FileUpload, HttpRequest, HttpResponse, Validation } from './upload-controller.protocols'

export class UploadController implements Controller {
  constructor (
    private readonly fileUpload: FileUpload,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, tempFilePath, mimetype, size } = httpRequest.body.file
      const url = await this.fileUpload.upload({ name, tempFilePath, mimetype, size })
      return ok({ url })
    } catch (error) {
      return serverError(error)
    }
  }
}
