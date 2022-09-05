import { badRequest } from '@/presentation/helpers/http/http-helper'
import { AddRecipe, Controller, HttpRequest, HttpResponse, Validation } from './add-recipe-controller.protocols'

export class AddRecipeController implements Controller {
  constructor (private readonly validation: Validation, private readonly addRecipe: AddRecipe) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { name, description, prepTime, cookTime, difficulty, serves, url, nutrition, tags, ingredients, steps } = httpRequest.body
    await this.addRecipe.add({ name, description, prepTime, cookTime, difficulty, serves, url, nutrition, tags, ingredients, steps })
    return null
  }
}
