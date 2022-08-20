import { AddObjective, AddObjectiveModel, AddObjectiveRepository, ObjectiveModel } from './db-add-objectve.protocols'

export class DbAddObjective implements AddObjective {
  constructor (private readonly addObjectiveRepository: AddObjectiveRepository) {}

  async add (objectiveData: AddObjectiveModel): Promise<ObjectiveModel> {
    const objective = await this.addObjectiveRepository.add(objectiveData)
    return objective
  }
}
