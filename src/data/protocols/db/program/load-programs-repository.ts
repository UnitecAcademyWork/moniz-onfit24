import { ProgramModel } from '@/domain/models/program'

export interface LoadProgramsRepository {
  load: () => Promise<ProgramModel[]>
}
