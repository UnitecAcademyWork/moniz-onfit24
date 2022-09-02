
import { AddWeekToProgram, AddWeekToProgramRepository, ProgramModel } from './db-add-week-to-program.protocols'

export class DbAddWeekToProgram implements AddWeekToProgram {
  constructor (private readonly addWeekToProgramRepository: AddWeekToProgramRepository) {}

  async associate (programId: string, weekId: string): Promise<ProgramModel> {
    await this.addWeekToProgramRepository.associate(programId, weekId)
    return Promise.resolve(null)
  }
}
