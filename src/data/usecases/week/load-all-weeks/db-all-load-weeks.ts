import { LoadWeeks, LoadWeeksRepository, WeekModel } from './db-all-load-weeks.protocols'

export class DbLoadWeeks implements LoadWeeks {
  constructor (private readonly loadWeeksRepository: LoadWeeksRepository) {}

  async loadAll (): Promise<WeekModel[]> {
    const weeks = await this.loadWeeksRepository.loadAll()
    return weeks
  }
}
