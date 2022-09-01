import { LoadWeeks, LoadWeeksRepository, WeekModel } from './db-load-weeks.protocols'

export class DbLoadWeeks implements LoadWeeks {
  constructor (private readonly loadWeeksRepository: LoadWeeksRepository) {}

  async loadAll (): Promise<WeekModel[]> {
    await this.loadWeeksRepository.loadAll()
    return Promise.resolve(null)
  }
}
