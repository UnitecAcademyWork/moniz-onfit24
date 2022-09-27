import { DbLoadCategories } from '@/data/usecases/category/load-all-categories/load-all-categories'
import { LoadCategories } from '@/domain/usecases/category/load-all-categories'
import { CategoryRepository } from '@/infra/db/category/category-repository'

export const makeDbLoadCategories = (): LoadCategories => {
  const categoriesRepository = new CategoryRepository()
  return new DbLoadCategories(categoriesRepository)
}
