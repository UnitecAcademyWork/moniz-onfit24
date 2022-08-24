import { LoadObjectives, LoadObjectivesRepository, ObjectiveModel } from './db-load-objectives.protocols'

export class DbLoadObjectives implements LoadObjectives {
  constructor (private readonly loadObjectivesRepository: LoadObjectivesRepository) {}

  async load (): Promise<ObjectiveModel[]> {
    const objectives = await this.loadObjectivesRepository.loadAll()
    return objectives
  }
}
