import { ProgramModel } from '@/domain/models/program'

export interface UpdateProgram {
  update: (programData: ProgramModel) => Promise<ProgramModel>
}
