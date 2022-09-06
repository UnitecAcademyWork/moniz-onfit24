import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, DeleteRecipe, HttpRequest, HttpResponse } from './delete-recipe-controller.protocols'

export class DeleteRecipeController implements Controller {
  constructor (private readonly deleteRecipe: DeleteRecipe) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const recipe = await this.deleteRecipe.delete(httpRequest.params.recipeId)
      if (!recipe) {
        return forbidden(new InvalidParamError('recipeId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
