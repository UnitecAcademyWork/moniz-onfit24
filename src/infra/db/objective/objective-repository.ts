import { Objective } from '../entities/objective'
import { AddObjectiveModel, AddObjectiveRepository, LoadObjectiveByNameRepository, ObjectiveModel } from '@/data/usecases/add-objective/db-add-objectve.protocols'

export class ObjectiveRepository implements AddObjectiveRepository, LoadObjectiveByNameRepository {
  async add (objectiveData: AddObjectiveModel): Promise<ObjectiveModel> {
    const objective = new Objective()
    objective.name = objectiveData.name
    objective.icon = objectiveData.icon
    objective.description = objectiveData.description
    const result = await objective.save()
    return result
  }

  async loadByName (name: string): Promise<ObjectiveModel> {
    const objective = await Objective.findOneBy({ name })
    return objective
  }
}
