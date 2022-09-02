import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddWeekToProgram } from '@/main/factories/usecases/program/add-week-to-program/db-add-week-to-program-factory'
import { AddWeekToProgramController } from '@/presentation/controllers/program/add-week-to-program/add-week-to-program-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddWeekToProgramValidation } from './add-week-to-program-validation-factory'

export const makeAddWeekToProgramController = (): Controller => {
  const controller = new AddWeekToProgramController(makeAddWeekToProgramValidation(), makeDbAddWeekToProgram())
  return makeLogControllerDecorator(controller)
}
