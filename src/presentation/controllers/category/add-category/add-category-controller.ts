import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddCategory, Controller, HttpRequest, HttpResponse, Validation } from './add-category-controller.protocols'

export class AddCategoryController implements Controller {
  constructor (private readonly validation: Validation, private readonly addCategory: AddCategory) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, img, description } = httpRequest.body
      const category = await this.addCategory.add({ name, img, description })
      return ok(category)
    } catch (error) {
      return serverError(error)
    }
  }
}
