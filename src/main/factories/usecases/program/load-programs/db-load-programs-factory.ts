import { LoadPrograms } from '@/domain/usecases/program/load-programs'
import { ProgramRepository } from '@/infra/db/program/program-repository'
import { DbLoadPrograms } from '@/data/usecases/program/load-programs/db-load-programs'

export const makeDbLoadPrograms = (): LoadPrograms => {
  const programRepository = new ProgramRepository()
  return new DbLoadPrograms(programRepository)
}
