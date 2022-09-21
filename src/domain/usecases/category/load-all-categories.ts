import { CategoryModel } from '@/domain/models/category'

export interface LoadCategories {
  loadAll: () => Promise<CategoryModel[]>
}
