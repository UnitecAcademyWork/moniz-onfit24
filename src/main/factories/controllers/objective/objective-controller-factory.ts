import { makeObjectiveValidation } from './objective-validation-factory'
import { makeDbObjective } from '../../usecases/objective/add-objective/db-add-objective-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { ObjectiveController } from '@/presentation/controllers/objective/add-objective/add-objective-controller'
import { Controller } from '@/presentation/protocols'

export const makeObjectiveController = (): Controller => {
  const controller = new ObjectiveController(makeObjectiveValidation(), makeDbObjective())
  return makeLogControllerDecorator(controller)
}
