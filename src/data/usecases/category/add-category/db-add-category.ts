import { AddCategory, AddCategoryModel, AddCategoryRepository, CategoryModel } from './db-add-category.protocols'

export class DbAddCategory implements AddCategory {
  constructor (private readonly addCategoryRepository: AddCategoryRepository) {}

  async add (categoryData: AddCategoryModel, id?: string): Promise<CategoryModel> {
    const category = await this.addCategoryRepository.add(categoryData, id)
    return category
  }
}
