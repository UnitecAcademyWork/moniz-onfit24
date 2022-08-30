import { ProgramModel } from '@/domain/models/program'

export interface DeleteProgram {
  delete: (programId: string) => Promise<ProgramModel>
}
