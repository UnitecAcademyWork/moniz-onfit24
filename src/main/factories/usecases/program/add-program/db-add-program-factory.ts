import { AddProgram } from '@/domain/usecases/add-program'
import { DbAddProgram } from '@/data/usecases/add-program/db-add-program'
import { ProgramRepository } from '@/infra/db/program/program-repository'

export const makeDbAddProgram = (): AddProgram => {
  const programRepository = new ProgramRepository()
  return new DbAddProgram(programRepository)
}
