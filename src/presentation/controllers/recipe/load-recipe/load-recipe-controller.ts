import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadRecipeById } from './load-recipe-controller.protocols'

export class LoadRecipeController implements Controller {
  constructor (private readonly loadRecipeById: LoadRecipeById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const recipe = await this.loadRecipeById.loadById(httpRequest.params.recipeId)
      if (!recipe) {
        return forbidden(new InvalidParamError('recipeId'))
      }
      return ok(recipe)
    } catch (error) {
      return serverError(error)
    }
  }
}
