import { RecipeModel } from '@/domain/models/recipe'

export interface LoadRecipesRepository {
  loadAll: () => Promise<RecipeModel[]>
}
