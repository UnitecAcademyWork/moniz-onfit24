import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'
import { CategoryModel } from '@/domain/models/category'
import { AddCategoryModel } from '@/domain/usecases/category/add-category'
import { DeleteCategory } from '@/domain/usecases/category/delete-category'
import { LoadCategories } from '@/domain/usecases/category/load-all-categories'
import { LoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { Category } from '../entities/category'

export class CategoryRepository implements AddCategoryRepository, LoadCategoryById, LoadCategories, DeleteCategory {
  async add (categoryData: AddCategoryModel, id?: string): Promise<CategoryModel> {
    const category = new Category()
    category.id = id
    category.name = categoryData.name
    category.img = categoryData.img
    category.description = categoryData.description
    const result = await Category.save(category)
    return result
  }

  async loadById (id: string): Promise<CategoryModel> {
    const category = await Category.findOneBy({ id })
    return category
  }

  async loadAll (): Promise<CategoryModel[]> {
    const categories = await Category.find()
    return categories
  }

  async delete (id: string): Promise<CategoryModel> {
    const category = await Category.findOneBy({ id })
    if (!category) {
      return null
    }
    return await Category.remove(category)
  }
}
