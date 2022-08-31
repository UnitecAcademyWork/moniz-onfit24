import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddWeek } from '@/main/factories/usecases/week/add-week/db-add-week-factory'
import { UpdateWeekController } from '@/presentation/controllers/week/update-week/update-week-controller'
import { Controller } from '@/presentation/protocols'

export const makeUpdateWeekController = (): Controller => {
  const controller = new UpdateWeekController(makeDbAddWeek())
  return makeLogControllerDecorator(controller)
}
