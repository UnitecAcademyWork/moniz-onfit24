import { ProgramModel } from '../models/program'

export interface AddProgramModel {
  name: string
  description: string
  difficulty: string
  duration?: string
  objective?: string[]
}

export interface AddProgram {
  add: (programData: AddProgramModel) => Promise<ProgramModel>
}
