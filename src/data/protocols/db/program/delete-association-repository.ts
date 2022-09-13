import { ProgramModel } from '@/domain/models/program'

export interface DeleteProgramWeekRepository {
  deleteAssociation: (programId: string, weekId: string) => Promise<ProgramModel>
}
