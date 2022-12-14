import { ProgramModel } from '../../models/program'

export type AddProgramModel = Omit<ProgramModel, 'id'>

export interface AddProgram {
  add: (programData: AddProgramModel, id?: string) => Promise<ProgramModel>
}
