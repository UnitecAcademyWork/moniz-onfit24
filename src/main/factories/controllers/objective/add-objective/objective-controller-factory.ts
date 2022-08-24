import { makeAddObjectiveValidation } from './objective-validation-factory'
import { makeDbAddObjective } from '../../../usecases/objective/add-objective/db-add-objective-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { ObjectiveController } from '@/presentation/controllers/objective/add-objective/add-objective-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddObjectiveController = (): Controller => {
  const controller = new ObjectiveController(makeAddObjectiveValidation(), makeDbAddObjective())
  return makeLogControllerDecorator(controller)
}
