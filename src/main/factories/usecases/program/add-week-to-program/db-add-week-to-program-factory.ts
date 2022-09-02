import { ProgramRepository } from '@/infra/db/program/program-repository'
import { AddWeekToProgram } from '@/domain/usecases/program/add-week-to-program'
import { DbAddWeekToProgram } from '@/data/usecases/program/add-week-to-program/db-add-week-to-program'

export const makeDbAddWeekToProgram = (): AddWeekToProgram => {
  const programRepository = new ProgramRepository()
  return new DbAddWeekToProgram(programRepository)
}
