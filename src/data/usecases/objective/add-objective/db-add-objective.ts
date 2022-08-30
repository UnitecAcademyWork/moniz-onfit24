import { AddObjective, AddObjectiveModel, AddObjectiveRepository, LoadObjectiveByNameRepository, ObjectiveModel } from './db-add-objectve.protocols'

export class DbAddObjective implements AddObjective {
  constructor (
    private readonly addObjectiveRepository: AddObjectiveRepository,
    private readonly loadObjectiveByIdRepository: LoadObjectiveByNameRepository
  ) {}

  async add (objectiveData: AddObjectiveModel): Promise<ObjectiveModel> {
    const objective = await this.loadObjectiveByIdRepository.loadByName(objectiveData.name)
    if (!objective) {
      const newObjective = await this.addObjectiveRepository.add(objectiveData)
      return newObjective
    }
    return null
  }
}
