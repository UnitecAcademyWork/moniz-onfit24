import { LoadPrograms, LoadProgramsRepository, ProgramModel } from './db-load-all-programs.protocols'

export class DbLoadPrograms implements LoadPrograms {
  constructor (private readonly loadProgramsRepository: LoadProgramsRepository) {}

  async loadAll (): Promise<ProgramModel[]> {
    const programs = await this.loadProgramsRepository.loadAll()
    return programs
  }
}
