import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbDeleteProgramWeek } from '@/main/factories/usecases/program/delete-program-week/delete-program-week-factory'
import { DeleteProgramWeekController } from '@/presentation/controllers/program/delete-program-week/delete-program-week-controller'
import { Controller } from '@/presentation/protocols'
import { makeDeleteProgramWeekValidation } from './delete-program-week-validation-factory'

export const makeDeleteProgramWeekController = (): Controller => {
  const controller = new DeleteProgramWeekController(makeDeleteProgramWeekValidation(), makeDbDeleteProgramWeek())
  return makeLogControllerDecorator(controller)
}
