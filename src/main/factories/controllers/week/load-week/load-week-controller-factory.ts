import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadWeek } from '@/main/factories/usecases/week/load-week-by-id/db-load-week-factory'
import { LoadWeekController } from '@/presentation/controllers/week/load-week/load-week-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadWeekController = (): Controller => {
  const controller = new LoadWeekController(makeDbLoadWeek())
  return makeLogControllerDecorator(controller)
}
