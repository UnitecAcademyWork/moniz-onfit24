import { ProgramModel } from '../models/program'

export interface LoadProgramById {
  loadById: (id: string) => Promise<ProgramModel>
}
