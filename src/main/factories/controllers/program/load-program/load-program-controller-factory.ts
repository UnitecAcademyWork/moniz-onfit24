import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadProgram, makeDbLoadProgramWeeks } from '@/main/factories/usecases/program/load-program/db-load-program-factory'
import { LoadProgramWeeksController } from '@/presentation/controllers/program/load-program-weeks/load-program-weeks-controller'
import { LoadProgramController } from '@/presentation/controllers/program/load-programa/load-program-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadProgramController = (): Controller => {
  const controller = new LoadProgramController(makeDbLoadProgram())
  return makeLogControllerDecorator(controller)
}

export const makeLoadProgramWeeksController = (): Controller => {
  const controller = new LoadProgramWeeksController(makeDbLoadProgramWeeks())
  return makeLogControllerDecorator(controller)
}
