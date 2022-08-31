import { AddProgram, AddProgramModel, AddProgramRepository, ProgramModel } from './db-add-program.protocols'

export class DbAddProgram implements AddProgram {
  constructor (private readonly addProgramRepository: AddProgramRepository) {}

  async add (programData: AddProgramModel, id?: string): Promise<ProgramModel> {
    const program = await this.addProgramRepository.add(programData, id)
    return program
  }
}
