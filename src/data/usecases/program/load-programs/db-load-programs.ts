import { LoadPrograms, LoadProgramsRepository, ProgramModel } from './db-load-programs.protocols'

export class DbLoadPrograms implements LoadPrograms {
  constructor (private readonly loadProgramsRepository: LoadProgramsRepository) {}

  async load (): Promise<ProgramModel[]> {
    const programs = await this.loadProgramsRepository.load()
    return programs
  }
}
