import { ObjectiveModel } from '../../models/objective'

export interface LoadObjectives {
  loadAll: () => Promise<ObjectiveModel[]>
}
