import { RecipeModel } from '@/domain/models/recipe'

export interface LoadRecipeByIdRepository {
  loadById: (id: string) => Promise<RecipeModel>
}
