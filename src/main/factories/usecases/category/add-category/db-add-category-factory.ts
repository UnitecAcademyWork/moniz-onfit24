import { DbAddCategory } from '@/data/usecases/category/add-category/db-add-category'
import { AddCategory } from '@/domain/usecases/category/add-category'
import { CategoryRepository } from '@/infra/db/category/category-repository'

export const makeDbAddCategory = (): AddCategory => {
  const categoryRepository = new CategoryRepository()
  return new DbAddCategory(categoryRepository)
}
