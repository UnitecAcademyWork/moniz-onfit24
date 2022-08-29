import { LoadProgramById, LoadProgramByIdRepository, ProgramModel } from './db-load-program-by-id.protocols'

export class DbLoadProgramById implements LoadProgramById {
  constructor (private readonly loadProgramByIdRepository: LoadProgramByIdRepository) {}

  async loadById (id: string): Promise<ProgramModel> {
    const program = await this.loadProgramByIdRepository.loadById(id)
    return program
  }
}
