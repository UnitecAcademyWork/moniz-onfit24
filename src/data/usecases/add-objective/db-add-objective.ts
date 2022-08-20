import { AddObjective, AddObjectiveModel, AddObjectiveRepository, ObjectiveModel } from './db-add-objectve.protocols'

export class DbAddObjective implements AddObjective {
  constructor (private readonly addObjectiveRepository: AddObjectiveRepository) {}

  async add (objective: AddObjectiveModel): Promise<ObjectiveModel> {
    await this.addObjectiveRepository.add(objective)
    return Promise.resolve(null)
  }
}
