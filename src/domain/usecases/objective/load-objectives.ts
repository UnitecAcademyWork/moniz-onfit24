import { ObjectiveModel } from '../../models/objective'

export interface LoadObjectives {
  load: () => Promise<ObjectiveModel[]>
}
