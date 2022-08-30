import { DbDeleteProgram } from '@/data/usecases/program/delete-program/db-delete-program'
import { DeleteProgram } from '@/domain/usecases/program/delete-program'
import { ProgramRepository } from '@/infra/db/program/program-repository'

export const makeDbDeleteProgram = (): DeleteProgram => {
  const programRepository = new ProgramRepository()
  return new DbDeleteProgram(programRepository)
}
