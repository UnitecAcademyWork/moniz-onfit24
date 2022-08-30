import { ObjectiveModel } from '@/domain/models/objective'

export interface LoadObjectiveByNameRepository {
  loadByName: (name: string) => Promise<ObjectiveModel | null>
}
