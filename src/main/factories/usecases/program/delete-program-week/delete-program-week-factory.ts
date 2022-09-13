import { DbDeleteProgramWeek } from '@/data/usecases/program/delete-program-week/db-delete-program-week'
import { DeleteProgramWeek } from '@/domain/usecases/program/delete-association'
import { ProgramRepository } from '@/infra/db/program/program-repository'

export const makeDbDeleteProgramWeek = (): DeleteProgramWeek => {
  const programRepository = new ProgramRepository()
  return new DbDeleteProgramWeek(programRepository)
}
