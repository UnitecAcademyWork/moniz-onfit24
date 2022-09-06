import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadRecipe } from '@/main/factories/usecases/recipe/load-recipe/db-load-recipe-factory'
import { LoadRecipeController } from '@/presentation/controllers/recipe/load-recipe/load-recipe-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeLoadRecipeController = (): Controller => {
  const controller = new LoadRecipeController(makeDbLoadRecipe())
  return makeLogControllerDecorator(controller)
}
