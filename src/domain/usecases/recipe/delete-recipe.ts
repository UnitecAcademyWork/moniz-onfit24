import { RecipeModel } from '@/domain/models/recipe'

export interface DeleteRecipe {
  delete: (id: string) => Promise<RecipeModel>
}
