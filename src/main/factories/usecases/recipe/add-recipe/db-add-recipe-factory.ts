import { DbAddRecipe } from '@/data/usecases/recipe/add-recipe/db-add-recipe'
import { AddRecipe } from '@/domain/usecases/recipe/add-recipe'
import { RecipeRepository } from '@/infra/db/recipe/recipe-repository'

export const makeDbAddRecipe = (): AddRecipe => {
  const recipeRepository = new RecipeRepository()
  return new DbAddRecipe(recipeRepository)
}
