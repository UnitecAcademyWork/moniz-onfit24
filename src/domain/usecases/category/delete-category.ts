import { CategoryModel } from '@/domain/models/category'

export interface DeleteCategory {
  delete: (id: string) => Promise<CategoryModel>
}
