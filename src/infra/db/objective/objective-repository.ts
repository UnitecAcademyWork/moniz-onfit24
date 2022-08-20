import { Objective } from '../entities/objective'
import { AddObjectiveModel, AddObjectiveRepository, ObjectiveModel } from '@/data/usecases/add-objective/db-add-objectve.protocols'

export class ObjectiveRepository implements AddObjectiveRepository {
  async add (objectiveData: AddObjectiveModel): Promise<ObjectiveModel> {
    const objective = new Objective()
    objective.name = objectiveData.name
    objective.icon = objectiveData.icon
    objective.description = objectiveData.description
    const result = await objective.save()
    return result
  }
}
