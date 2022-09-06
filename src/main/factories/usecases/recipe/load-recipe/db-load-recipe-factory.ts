import { DbLoadRecipeById } from '@/data/usecases/recipe/load-recipe-by-id/db-load-recipe-by-id'
import { LoadRecipeById } from '@/domain/usecases/recipe/load-recipe-by-id'
import { RecipeRepository } from '@/infra/db/recipe/recipe-repository'

export const makeDbLoadRecipe = (): LoadRecipeById => {
  const recipeRepository = new RecipeRepository()
  return new DbLoadRecipeById(recipeRepository)
}
