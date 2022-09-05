import { RecipeModel } from '@/domain/models/recipe'

export type AddRecipeModel = Omit<RecipeModel, 'id'>

export interface AddRecipe {
  add: (recipeData: AddRecipeModel) => Promise<RecipeModel>
}
