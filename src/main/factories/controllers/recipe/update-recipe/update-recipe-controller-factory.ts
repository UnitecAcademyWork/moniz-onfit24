import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddRecipe } from '@/main/factories/usecases/recipe/add-recipe/db-add-recipe-factory'
import { UpdateRecipeController } from '@/presentation/controllers/recipe/update-recipe/update-recipe-controller'
import { Controller } from '@/presentation/protocols'

export const makeUpdateRecipeController = (): Controller => {
  const controller = new UpdateRecipeController(makeDbAddRecipe())
  return makeLogControllerDecorator(controller)
}
