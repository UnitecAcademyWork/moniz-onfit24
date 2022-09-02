import { ProgramModel } from '@/domain/models/program'

export interface AddWeekToProgram {
  associate: (programId: string, weekId: string) => Promise<ProgramModel>
}
