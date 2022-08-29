import { ProgramModel } from '@/domain/models/program'
import { AddProgramModel } from '@/domain/usecases/add-programa'

export interface AddProgramRepository {
  add: (programData: AddProgramModel) => Promise<ProgramModel>
}
