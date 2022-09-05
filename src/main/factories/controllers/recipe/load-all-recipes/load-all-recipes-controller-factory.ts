import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadRecipes } from '@/main/factories/usecases/recipe/load-all-recipes/db-load-recipes-factory'
import { LoadRecipesController } from '@/presentation/controllers/recipe/load-all-recipes/load-all-recipes-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadRecipesController = (): Controller => {
  const controller = new LoadRecipesController(makeDbLoadRecipes())
  return makeLogControllerDecorator(controller)
}
