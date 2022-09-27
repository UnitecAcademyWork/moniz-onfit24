import { DbLoadCategoryById } from '@/data/usecases/category/load-category/db-load-category-b-id'
import { LoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { CategoryRepository } from '@/infra/db/category/category-repository'

export const makeDbLoadCategory = (): LoadCategoryById => {
  const categoryRepository = new CategoryRepository()
  return new DbLoadCategoryById(categoryRepository)
}
