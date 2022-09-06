import { RecipeModel } from '@/domain/models/recipe'

export interface LoadRecipeById {
  loadById: (id: string) => Promise<RecipeModel>
}
