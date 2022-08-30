import { DeleteProgram, DeleteProgramRepository } from './db-delete-program.protocols'

export class DbDeleteProgram implements DeleteProgram {
  constructor (private readonly deleteProgramRepository: DeleteProgramRepository) {}

  async delete (programId: string): Promise<void> {
    await this.deleteProgramRepository.delete(programId)
    return null
  }
}
