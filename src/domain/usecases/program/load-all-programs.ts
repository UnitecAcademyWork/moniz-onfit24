import { ProgramModel } from '@/domain/models/program'

export interface LoadPrograms {
  loadAll: () => Promise<ProgramModel[]>
}
