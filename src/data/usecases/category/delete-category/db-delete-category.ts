import { CategoryModel, DeleteCategory, DeleteCategoryRepository } from './db-delete-category.protocols'

export class DbDeleteCategory implements DeleteCategory {
  constructor (private readonly deleteCategoryRepository: DeleteCategoryRepository) {}

  async delete (id: string): Promise<CategoryModel> {
    const category = await this.deleteCategoryRepository.delete(id)
    return category
  }
}
