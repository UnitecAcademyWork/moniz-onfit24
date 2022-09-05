import { LoadPrograms } from '@/domain/usecases/program/load-all-programs'
import { ProgramRepository } from '@/infra/db/program/program-repository'
import { DbLoadPrograms } from '@/data/usecases/program/load-all-programs/db-load-all-programs'

export const makeDbLoadPrograms = (): LoadPrograms => {
  const programRepository = new ProgramRepository()
  return new DbLoadPrograms(programRepository)
}
