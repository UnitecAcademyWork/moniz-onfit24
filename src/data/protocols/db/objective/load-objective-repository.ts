import { ObjectiveModel } from '@/domain/models/objective'

export interface LoadObjectiveByIdRepository {
  load: (name: string) => Promise<ObjectiveModel | null>
}
