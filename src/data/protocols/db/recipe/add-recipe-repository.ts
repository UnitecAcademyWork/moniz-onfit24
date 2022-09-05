import { RecipeModel } from '@/domain/models/recipe'
import { AddRecipeModel } from '@/domain/usecases/recipe/add-recipe'

export interface AddRecipeRepository {
  add: (recipeData: AddRecipeModel) => Promise<RecipeModel>
}
