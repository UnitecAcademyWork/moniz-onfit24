import { makeAddRecipeValidation } from './add-recipe-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { makeDbAddRecipe } from '@/main/factories/usecases/recipe/add-recipe/db-add-recipe-factory'
import { AddRecipeController } from '@/presentation/controllers/recipe/add-recipe/add-recipe-controller'

export const makeAddRecipeController = (): Controller => {
  const controller = new AddRecipeController(makeAddRecipeValidation(), makeDbAddRecipe())
  return makeLogControllerDecorator(controller)
}
