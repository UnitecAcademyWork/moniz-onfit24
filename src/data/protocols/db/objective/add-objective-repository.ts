import { ObjectiveModel } from '@/domain/models/objective'
import { AddObjectiveModel } from '@/domain/usecases/add-objective'

export interface AddObjectiveRepository {
  add: (objectiveData: AddObjectiveModel) => Promise<ObjectiveModel | null>
}
