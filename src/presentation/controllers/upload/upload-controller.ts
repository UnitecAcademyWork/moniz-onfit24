import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, FileUpload, HttpRequest, HttpResponse, Validation } from './upload-controller.protocols'

export class UploadController implements Controller {
  constructor (
    private readonly fileUploadAdapter: FileUpload,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.files.file)
      if (error) {
        return badRequest(error)
      }
      const { name, tempFilePath, mimetype, size } = httpRequest.files.file
      const url = await this.fileUploadAdapter.upload({ name, tempFilePath, mimetype, size })
      return ok({ url })
    } catch (error) {
      return serverError(error)
    }
  }
}
