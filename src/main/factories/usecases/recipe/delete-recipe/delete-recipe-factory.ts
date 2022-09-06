import { DbDeleteRecipe } from '@/data/usecases/recipe/delete-recipe/db-delete-recipe'
import { DeleteRecipe } from '@/domain/usecases/recipe/delete-recipe'
import { RecipeRepository } from '@/infra/db/recipe/recipe-repository'

export const makeDbDeleteRecipe = (): DeleteRecipe => {
  const recipeRepository = new RecipeRepository()
  return new DbDeleteRecipe(recipeRepository)
}
