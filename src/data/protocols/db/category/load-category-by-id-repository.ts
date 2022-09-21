import { CategoryModel } from '@/domain/models/category'

export interface LoadCategoryByIdRepository {
  loadById: (id: string) => Promise<CategoryModel>
}
