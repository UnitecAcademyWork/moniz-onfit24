import { ProgramModel } from '@/domain/models/program'

export interface DeleteProgramRepository {
  delete: (programId: string) => Promise<ProgramModel>
}
