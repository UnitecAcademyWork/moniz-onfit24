import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, DeleteCategory, HttpRequest, HttpResponse } from './delete-category-controller.protocols'

export class DeleteCategoryController implements Controller {
  constructor (private readonly deleteCategory: DeleteCategory) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categoryId = httpRequest.params.categoryId
      const category = await this.deleteCategory.delete(categoryId)
      if (!category) {
        return forbidden(new InvalidParamError('categoria inválida'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
