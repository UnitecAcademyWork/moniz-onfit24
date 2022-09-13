import { ProgramModel } from '@/domain/models/program'

export interface DeleteProgramWeek {
  deleteAssociation: (programId: string, weekId: string) => Promise<ProgramModel>
}
