import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddRecipe, Controller, HttpRequest, HttpResponse } from './update-recipe-controller.protocols'

export class UpdateRecipeController implements Controller {
  constructor (
    private readonly addRecipe: AddRecipe
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const recipeId = httpRequest.params.recipeId
      const { name, description, prepTime, cookTime, difficulty, serves, url, nutrition, tags, ingredients, steps } = httpRequest.body
      const recipe = await this.addRecipe.add({ name, description, prepTime, cookTime, difficulty, serves, url, nutrition, tags, ingredients, steps }, recipeId)
      return ok(recipe)
    } catch (error) {
      return serverError(error)
    }
  }
}
