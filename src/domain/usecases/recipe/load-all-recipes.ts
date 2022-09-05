import { RecipeModel } from '@/domain/models/recipe'

export interface LoadRecipes {
  loadAll: () => Promise<RecipeModel[]>
}
