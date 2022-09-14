import { LoadProgramById } from '@/domain/usecases/program/load-program-by-id'
import { DbLoadProgramById } from '@/data/usecases/program/load-program/db-load-program-by-id'
import { ProgramRepository } from '@/infra/db/program/program-repository'
import { LoadProgramWeeks } from '@/domain/usecases/program/load-program-weeks'
import { DbLoadProgramWeeks } from '@/data/usecases/program/load-program-weeks/db-load-program-weeks'

export const makeDbLoadProgram = (): LoadProgramById => {
  const programRepository = new ProgramRepository()
  return new DbLoadProgramById(programRepository)
}

export const makeDbLoadProgramWeeks = (): LoadProgramWeeks => {
  const programRepository = new ProgramRepository()
  return new DbLoadProgramWeeks(programRepository)
}
