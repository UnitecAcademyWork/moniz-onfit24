import { DbDeleteCategory } from '@/data/usecases/category/delete-category/db-delete-category'
import { DeleteCategory } from '@/domain/usecases/category/delete-category'
import { CategoryRepository } from '@/infra/db/category/category-repository'

export const makeDbDeleteCategory = (): DeleteCategory => {
  const categoryRepository = new CategoryRepository()
  return new DbDeleteCategory(categoryRepository)
}
