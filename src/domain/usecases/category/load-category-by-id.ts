import { CategoryModel } from '@/domain/models/category'

export interface LoadCategoryById {
  loadById: (id: string) => Promise<CategoryModel>
}
