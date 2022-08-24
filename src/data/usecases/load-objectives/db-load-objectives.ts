import { LoadObjectives, LoadObjectivesRepository, ObjectiveModel } from './db-load-objectives.protocols'

export class DbLoadObjectives implements LoadObjectives {
  constructor (private readonly loadObjectivesRepository: LoadObjectivesRepository) {}

  async load (): Promise<ObjectiveModel[]> {
    await this.loadObjectivesRepository.loadAll()
    return Promise.resolve(null)
  }
}
