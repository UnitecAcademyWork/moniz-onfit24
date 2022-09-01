import { AddWeekRepository } from '@/data/protocols/db/week/add-week-repository'
import { LoadWeekByIdRepository } from '@/data/protocols/db/week/load-week-by-id-respository'
import { WeekModel } from '@/domain/models/week'
import { AddWeekModel } from '@/domain/usecases/week/add-week'
import { Week } from '../entities/week'

export class WeekRepository implements AddWeekRepository, LoadWeekByIdRepository {
  async add (weekData: AddWeekModel, weekId?: string): Promise<WeekModel> {
    const week = new Week()
    week.id = weekId
    week.goals = weekData.goals
    week.exercises = weekData.exercises
    await Week.save(week)
    return week
  }

  async loadById (weekId: string): Promise<WeekModel> {
    return await Week.findOneBy({ id: weekId })
  }
}
