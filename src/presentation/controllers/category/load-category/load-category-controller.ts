import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadCategoryById } from './load-category-controller.protocols'

export class LoadCategoryController implements Controller {
  constructor (private readonly loadCategoryById: LoadCategoryById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categoryId = httpRequest.params.categoryId
      const category = await this.loadCategoryById.loadById(categoryId)
      if (!category) {
        return forbidden(new InvalidParamError('categoria inválida'))
      }
      return ok(category)
    } catch (error) {
      return serverError(error)
    }
  }
}
