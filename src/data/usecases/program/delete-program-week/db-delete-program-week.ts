import { DeleteProgramWeek, DeleteProgramWeekRepository, ProgramModel } from './db-delete-program-week.protocols'

export class DbDeleteProgramWeek implements DeleteProgramWeek {
  constructor (private readonly deleteProgramRepository: DeleteProgramWeekRepository) {}

  async deleteAssociation (programId: string, weekId: string): Promise<ProgramModel> {
    const program = await this.deleteProgramRepository.deleteAssociation(programId, weekId)
    return program
  }
}
