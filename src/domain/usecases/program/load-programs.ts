import { ProgramModel } from '@/domain/models/program'

export interface LoadPrograms {
  load: () => Promise<ProgramModel[]>
}
