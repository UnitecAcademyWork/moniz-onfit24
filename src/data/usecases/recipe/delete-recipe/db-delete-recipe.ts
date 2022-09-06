import { DeleteRecipe, DeleteRecipeRepository, RecipeModel } from './db-delete-recipe.protocols'

export class DbDeleteRecipe implements DeleteRecipe {
  constructor (private readonly deleteRecipeRepository: DeleteRecipeRepository) {}

  async delete (id: string): Promise<RecipeModel> {
    const recipe = await this.deleteRecipeRepository.delete(id)
    return recipe
  }
}
