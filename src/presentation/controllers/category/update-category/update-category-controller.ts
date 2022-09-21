import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddCategory, Controller, HttpRequest, HttpResponse } from './update-category-controller.protocols'

export class UpdateCategoryController implements Controller {
  constructor (private readonly addCategory: AddCategory) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categoryId = httpRequest.params.categoryId
      const { name, img, description } = httpRequest.body
      const category = await this.addCategory.add({ name, img, description }, categoryId)
      return ok(category)
    } catch (error) {
      return serverError(error)
    }
  }
}
