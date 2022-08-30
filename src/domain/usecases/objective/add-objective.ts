import { ObjectiveModel } from '../../models/objective'

export type AddObjectiveModel = Omit<ObjectiveModel, 'id'>

export interface AddObjective {
  add: (objective: AddObjectiveModel) => Promise<ObjectiveModel | null>
}
