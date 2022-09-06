import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbDeleteRecipe } from '@/main/factories/usecases/recipe/delete-recipe/delete-recipe-factory'
import { DeleteRecipeController } from '@/presentation/controllers/recipe/delete-recipe/delete-recipe-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeDeleteRecipeController = (): Controller => {
  const controller = new DeleteRecipeController(makeDbDeleteRecipe())
  return makeLogControllerDecorator(controller)
}
