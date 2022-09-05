import { ObjectiveModel } from '@/domain/models/objective'

export interface LoadObjectivesRepository {
  loadAll: () => Promise<ObjectiveModel[] | null>
}
