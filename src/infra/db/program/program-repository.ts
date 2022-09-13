import { AddProgramRepository } from '@/data/protocols/db/program/add-program-repository'
import { DeleteProgramRepository } from '@/data/protocols/db/program/delete-program-repository'
import { LoadProgramByIdRepository } from '@/data/protocols/db/program/load-program-by-id-repository'
import { LoadProgramsRepository } from '@/data/protocols/db/program/load-all-programs-repository'
import { AddWeekToProgramRepository } from '@/data/protocols/db/program/program-week-repository'
import { ProgramModel } from '@/domain/models/program'
import { AddProgramModel } from '@/domain/usecases/program/add-program'
import { Program } from '../entities/program'
import { Week } from '../entities/week'
import { DeleteProgramWeekRepository } from '@/data/protocols/db/program/delete-association-repository'

export class ProgramRepository implements AddProgramRepository, LoadProgramByIdRepository, LoadProgramsRepository, DeleteProgramRepository, AddWeekToProgramRepository, DeleteProgramWeekRepository {
  async add (programData: AddProgramModel, programId?: string): Promise<ProgramModel> {
    const program = new Program()
    program.id = programId
    program.name = programData.name
    program.url = programData.url
    program.description = programData.description
    program.objective = programData.objective
    program.difficulty = programData.difficulty
    program.duration = programData.duration
    program.equipment = programData.equipment
    const result = await Program.save(program)
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

  async delete (programId: string): Promise<ProgramModel> {
    const program = await Program.findOneBy({ id: programId })
    if (!program) {
      return null
    }
    return await Program.remove(program)
  }

  async associate (programId: string, weekId: string): Promise<Program> {
    const program = await Program.findOne({ relations: { weeks: true }, where: { id: programId } })
    if (program) {
      const week = await Week.findOneBy({ id: weekId })
      if (week) {
        program.weeks.push(week)
        return await Program.save(program)
      }
    }
    return null
  }

  async deleteAssociation (programId: string, weekId: string): Promise<Program> {
    const program = await Program.findOne({ relations: { weeks: true }, where: { id: programId } })
    if (program) {
      const week = await Week.findOneBy({ id: weekId })
      if (week) {
        program.weeks = program.weeks.filter((week) => {
          return week.id !== weekId
        })
        await Program.save(program)
        return program
      }
    }
    return null
  }
}
