import { LoadRecipeById, LoadRecipeByIdRepository, RecipeModel } from './db-load-recipe-by-id.protocols'

export class DbLoadRecipeById implements LoadRecipeById {
  constructor (private readonly loadRecipeByIdRepository: LoadRecipeByIdRepository) {}

  async loadById (id: string): Promise<RecipeModel> {
    const recipe = await this.loadRecipeByIdRepository.loadById(id)
    return recipe
  }
}
