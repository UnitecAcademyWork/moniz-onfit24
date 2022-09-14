import { ProgramModel } from '@/domain/models/program'

export interface LoadProgramByIdRepository {
  loadById: (id: string) => Promise<ProgramModel>
}

export interface LoadProgramWeeksRepository {
  loadProgramWeeks: (id: string) => Promise<ProgramModel>
}
