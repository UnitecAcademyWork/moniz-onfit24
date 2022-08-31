import { AddWeek, AddWeekModel, AddWeekRepository, WeekModel } from './db-add-week.protocols'

export class DbAddWeek implements AddWeek {
  constructor (private readonly addWeekRepository: AddWeekRepository) {}

  async add (week: AddWeekModel, weekId: string): Promise<WeekModel> {
    await this.addWeekRepository.add(week, weekId)
    return Promise.resolve(null)
  }
}
