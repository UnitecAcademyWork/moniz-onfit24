import { ObjectiveModel } from '@/domain/models/objective'
import { AddObjectiveModel } from '@/domain/usecases/objective/add-objective'

export interface AddObjectiveRepository {
  add: (objectiveData: AddObjectiveModel) => Promise<ObjectiveModel | null>
}
