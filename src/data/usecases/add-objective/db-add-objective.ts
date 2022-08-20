import { AddObjective, AddObjectiveModel, AddObjectiveRepository, LoadObjectiveByIdRepository, ObjectiveModel } from './db-add-objectve.protocols'

export class DbAddObjective implements AddObjective {
  constructor (
    private readonly addObjectiveRepository: AddObjectiveRepository,
    private readonly loadObjectiveByIdRepository: LoadObjectiveByIdRepository
  ) {}

  async add (objectiveData: AddObjectiveModel): Promise<ObjectiveModel> {
    await this.loadObjectiveByIdRepository.load(objectiveData.name)
    const newObjective = await this.addObjectiveRepository.add(objectiveData)
    return newObjective
  }
}
