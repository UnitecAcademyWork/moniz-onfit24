import { ProgramModel } from '../../models/program'

export interface LoadProgramWeeks {
  loadWeeks: (id: string) => Promise<ProgramModel>
}
