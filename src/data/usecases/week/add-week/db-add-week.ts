import { AddWeek, AddWeekModel, AddWeekRepository, WeekModel } from './db-add-week.protocols'

export class DbAddWeek implements AddWeek {
  constructor (private readonly addWeekRepository: AddWeekRepository) {}

  async add (weekData: AddWeekModel, weekId?: string): Promise<WeekModel> {
    const week = await this.addWeekRepository.add(weekData, weekId)
    return week
  }
}
