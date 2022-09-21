import { CategoryModel } from '@/domain/models/category'

export interface LoadCategoriesRepository {
  loadAll: () => Promise<CategoryModel[]>
}
