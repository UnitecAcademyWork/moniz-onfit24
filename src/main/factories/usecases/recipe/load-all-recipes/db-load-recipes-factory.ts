import { LoadRecipes } from '@/domain/usecases/recipe/load-all-recipes'
import { RecipeRepository } from '@/infra/db/recipe/recipe-repository'
import { DbLoadRecipes } from '@/data/usecases/recipe/load-all-recipes/db-load-all-recipes'

export const makeDbLoadRecipes = (): LoadRecipes => {
  const recipeRepository = new RecipeRepository()
  return new DbLoadRecipes(recipeRepository)
}
