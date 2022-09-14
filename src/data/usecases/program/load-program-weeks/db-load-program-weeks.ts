import { LoadProgramWeeks, LoadProgramWeeksRepository, ProgramModel } from './db-load-program-weeks.protocols'

export class DbLoadProgramWeeks implements LoadProgramWeeks {
  constructor (private readonly loadProgramWeeksRepository: LoadProgramWeeksRepository) {}

  async loadWeeks (id: string): Promise<ProgramModel> {
    const program = await this.loadProgramWeeksRepository.loadProgramWeeks(id)
    return program
  }
}
