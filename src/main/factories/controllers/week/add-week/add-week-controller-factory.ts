import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddWeek } from '@/main/factories/usecases/week/add-week/db-add-week-factory'
import { AddWeekController } from '@/presentation/controllers/week/add-week/add-week-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddWeekValidation } from './add-week-validation-factory'

export const makeAddWeekController = (): Controller => {
  const controller = new AddWeekController(makeAddWeekValidation(), makeDbAddWeek())
  return makeLogControllerDecorator(controller)
}
