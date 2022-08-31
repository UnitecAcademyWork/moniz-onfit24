import { AddWeekRepository } from '@/data/protocols/db/week/add-week-repository'
import { WeekModel } from '@/domain/models/week'
import { AddWeekModel } from '@/domain/usecases/week/add-week'
import { Program } from '../entities/program'
import { Week } from '../entities/week'

export class WeekRepository implements AddWeekRepository {
  async add (weekData: AddWeekModel, weekId?: string): Promise<WeekModel> {
    const program = await Program.findOneBy({ id: weekData.programId })
    if (!program) {
      return null
    }
    const week = new Week()
    week.id = weekId
    week.programId = weekData.programId
    week.goals = weekData.goals
    week.exercises = weekData.exercises
    week.program = program
    await Week.save(week)
    delete week.program
    return week
  }
}
