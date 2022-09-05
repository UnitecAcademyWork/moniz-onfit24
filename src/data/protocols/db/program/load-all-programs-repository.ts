import { ProgramModel } from '@/domain/models/program'

export interface LoadProgramsRepository {
  loadAll: () => Promise<ProgramModel[]>
}
