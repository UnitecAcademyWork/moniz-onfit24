import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbDeleteProgram } from '@/main/factories/usecases/program/delete-program/delete-program-factory'
import { DeleteProgramController } from '@/presentation/controllers/program/delete-program/delete-program-controller'
import { Controller } from '@/presentation/protocols'

export const makeDeleteProgramController = (): Controller => {
  const controller = new DeleteProgramController(makeDbDeleteProgram())
  return makeLogControllerDecorator(controller)
}
