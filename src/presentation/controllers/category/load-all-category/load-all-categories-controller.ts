import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadCategories } from './load-all-categories-controller.protocols'

export class LoadCategoriesController implements Controller {
  constructor (private readonly loadCategories: LoadCategories) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categories = await this.loadCategories.loadAll()
      return categories.length ? ok(categories) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
