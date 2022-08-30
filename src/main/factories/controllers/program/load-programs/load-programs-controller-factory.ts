import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadPrograms } from '@/main/factories/usecases/program/load-programs/db-load-programs-factory'
import { LoadProgramsController } from '@/presentation/controllers/program/load-programs/load-programs'
import { Controller } from '@/presentation/protocols'

export const makeLoadProgramsController = (): Controller => {
  const controller = new LoadProgramsController(makeDbLoadPrograms())
  return makeLogControllerDecorator(controller)
}
