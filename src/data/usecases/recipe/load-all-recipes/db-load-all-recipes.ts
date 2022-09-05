import { LoadRecipes, LoadRecipesRepository, RecipeModel } from './db-load-all-recipes.protocols'

export class DbLoadRecipes implements LoadRecipes {
  constructor (private readonly loadRecipesRepository: LoadRecipesRepository) {}

  async loadAll (): Promise<RecipeModel[]> {
    const recipes = await this.loadRecipesRepository.loadAll()
    return recipes
  }
}
