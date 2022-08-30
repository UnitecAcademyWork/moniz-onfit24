import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddProgram } from '@/main/factories/usecases/program/add-program/db-add-program-factory'
import { UpdateProgramController } from '@/presentation/controllers/program/update-program/update-program-controller'
import { Controller } from '@/presentation/protocols'

export const makeUpdateProgramController = (): Controller => {
  const controller = new UpdateProgramController(makeDbAddProgram())
  return makeLogControllerDecorator(controller)
}
