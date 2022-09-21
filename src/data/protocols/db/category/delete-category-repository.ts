import { CategoryModel } from '@/domain/models/category'

export interface DeleteCategoryRepository {
  delete: (id: string) => Promise<CategoryModel>
}
