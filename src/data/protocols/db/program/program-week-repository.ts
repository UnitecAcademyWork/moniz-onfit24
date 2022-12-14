import { ProgramModel } from '@/domain/models/program'

export interface AddWeekToProgramRepository {
  associate: (programId: string, weekId: string) => Promise<ProgramModel>
}
