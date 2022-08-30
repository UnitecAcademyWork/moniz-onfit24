import { LoadProgramById } from '@/domain/usecases/program/load-program-by-id'
import { DbLoadProgramById } from '@/data/usecases/program/load-program/db-load-program-by-id'
import { ProgramRepository } from '@/infra/db/program/program-repository'

export const makeDbLoadProgram = (): LoadProgramById => {
  const programRepository = new ProgramRepository()
  return new DbLoadProgramById(programRepository)
}
