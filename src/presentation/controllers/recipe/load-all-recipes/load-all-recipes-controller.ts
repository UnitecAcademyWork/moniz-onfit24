import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadRecipes } from './load-all-recipes-controller.protocols'

export class LoadRecipesController implements Controller {
  constructor (private readonly loadRecipes: LoadRecipes) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const recipes = await this.loadRecipes.loadAll()
      return recipes.length ? ok(recipes) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
