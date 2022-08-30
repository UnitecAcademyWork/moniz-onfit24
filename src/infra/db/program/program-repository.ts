import { AddProgramRepository } from '@/data/protocols/db/program/add-program-repository'
import { LoadProgramByIdRepository } from '@/data/protocols/db/program/load-program-by-id-repository'
import { LoadProgramsRepository } from '@/data/protocols/db/program/load-programs-repository'
import { ProgramModel } from '@/domain/models/program'
import { AddProgramModel } from '@/domain/usecases/program/add-program'
import { Program } from '../entities/program'

export class ProgramRepository implements AddProgramRepository, LoadProgramByIdRepository, LoadProgramsRepository {
  async add (programData: AddProgramModel): Promise<ProgramModel> {
    const program = new Program()
    program.name = programData.name
    program.description = programData.description
    program.objective = programData.objective
    program.difficulty = programData.difficulty
    program.duration = programData.duration
    program.equipment = programData.equipment
    const result = await program.save()
    return result
  }

  async loadById (id: string): Promise<ProgramModel> {
    const program = await Program.findOneBy({ id })
    return program
  }

  async loadAll (): Promise<ProgramModel[]> {
    const programs = await Program.find()
    return programs
  }
}
