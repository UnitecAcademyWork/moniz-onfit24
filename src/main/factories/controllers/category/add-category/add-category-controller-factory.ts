import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddCategory } from '@/main/factories/usecases/category/add-category/db-add-category-factory'
import { AddCategoryController } from '@/presentation/controllers/category/add-category/add-category-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddCategoryValidation } from './add-category-validation-factory'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeAddCategoryValidation(), makeDbAddCategory())
  return makeLogControllerDecorator(controller)
}
