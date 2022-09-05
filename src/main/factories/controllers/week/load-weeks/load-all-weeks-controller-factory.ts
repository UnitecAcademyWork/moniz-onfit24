import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadWeeks } from '@/main/factories/usecases/week/load-weeks/db-load-weeks-factory'
import { LoadWeeksController } from '@/presentation/controllers/week/load-all-weeks/load-all-weeks-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadWeeksRepository = (): Controller => {
  const controller = new LoadWeeksController(makeDbLoadWeeks())
  return makeLogControllerDecorator(controller)
}
