import { AddProgram, AddProgramModel, AddProgramRepository, ProgramModel } from './db-add-program.protocols'

export class DbAddProgram implements AddProgram {
  constructor (private readonly addProgramRepository: AddProgramRepository) {}

  async add (programData: AddProgramModel): Promise<ProgramModel> {
    await this.addProgramRepository.add(programData)
    return null
  }
}
