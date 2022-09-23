import { CategoryModel, LoadCategories, LoadCategoriesRepository } from './load-all-categories.protocols'

export class DbLoadCategories implements LoadCategories {
  constructor (private readonly loadCategoriesRepository: LoadCategoriesRepository) {}

  async loadAll (): Promise<CategoryModel[]> {
    const categories = await this.loadCategoriesRepository.loadAll()
    return categories
  }
}
