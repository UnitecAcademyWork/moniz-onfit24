import { AddRecipe, AddRecipeModel, AddRecipeRepository, RecipeModel } from './db-add-recipe.protocols'

export class DbAddRecipe implements AddRecipe {
  constructor (private readonly addRecipeRepository: AddRecipeRepository) {}

  async add (recipeData: AddRecipeModel): Promise<RecipeModel> {
    const recipe = await this.addRecipeRepository.add(recipeData)
    return recipe
  }
}