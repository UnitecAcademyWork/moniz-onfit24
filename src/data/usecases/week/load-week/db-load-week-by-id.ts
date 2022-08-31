import { LoadWeekById, LoadWeekByIdRepository, WeekModel } from './db-load-week-by-id.protocols'

export class DbLoadWeekById implements LoadWeekById {
  constructor (private readonly loadWeekByIdRepository: LoadWeekByIdRepository) {}

  async loadById (weekId: string): Promise<WeekModel> {
    await this.loadWeekByIdRepository.loadById(weekId)
    return null
  }
}
