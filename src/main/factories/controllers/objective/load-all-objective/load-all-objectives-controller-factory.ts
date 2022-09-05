import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { LoadObjectivesController } from '@/presentation/controllers/objective/load-all-objectives/load-all-objectives-controller'
import { makeDbLoadObjectives } from '@/main/factories/usecases/objective/load-objective/db-load-all-objectives'

export const makeLoadObjectiveController = (): Controller => {
  const controller = new LoadObjectivesController(makeDbLoadObjectives())
  return makeLogControllerDecorator(controller)
}
