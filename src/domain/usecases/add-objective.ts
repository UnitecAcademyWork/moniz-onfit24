import { ObjectiveModel } from '../models/objective'

export interface AddObjectiveModel {
  name: string
  icon: string
  description: string
}

export interface AddObjective {
  add: (objective: AddObjectiveModel) => Promise<ObjectiveModel | null>
}
