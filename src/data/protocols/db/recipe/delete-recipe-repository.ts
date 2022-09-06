import { RecipeModel } from '@/domain/models/recipe'

export interface DeleteRecipeRepository {
  delete: (id: string) => Promise<RecipeModel>
}
