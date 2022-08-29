import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddProgram } from '@/main/factories/usecases/program/add-program/db-add-program-factory'
import { AddProgramController } from '@/presentation/controllers/program/add-program-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddProgramValidation } from './add-program-validation-factory'

export const makeAddProgramController = (): Controller => {
  const controller = new AddProgramController(makeAddProgramValidation(), makeDbAddProgram())
  return makeLogControllerDecorator(controller)
}
