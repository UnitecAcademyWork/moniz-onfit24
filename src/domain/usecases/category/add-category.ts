import { CategoryModel } from '@/domain/models/category'

export type AddCategoryModel = Omit<CategoryModel, 'id'>

export interface AddCategory {
  add: (category: AddCategoryModel, id?: string) => Promise<CategoryModel>
}
