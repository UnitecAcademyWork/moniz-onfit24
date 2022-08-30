import { DeleteProgram, DeleteProgramRepository, ProgramModel } from './db-delete-program.protocols'

export class DbDeleteProgram implements DeleteProgram {
  constructor (private readonly deleteProgramRepository: DeleteProgramRepository) {}

  async delete (programId: string): Promise<ProgramModel> {
    const program = await this.deleteProgramRepository.delete(programId)
    return program
  }
}
