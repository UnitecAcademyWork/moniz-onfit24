import { LoadProgramByIdRepository } from '@/data/protocols/db/program/load-program-by-id-repository'
import { LoadProgramById } from '@/domain/usecases/load-program-by-id'
import { ProgramModel } from '../add-program/db-add-program.protocols'

export class DbLoadProgramById implements LoadProgramById {
  constructor (private readonly loadProgramByIdRepository: LoadProgramByIdRepository) {}

  async loadById (id: string): Promise<ProgramModel> {
    const program = await this.loadProgramByIdRepository.loadById(id)
    return program
  }
}
