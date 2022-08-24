import { AddObjective } from '@/domain/usecases/add-objective'
import { DbAddObjective } from '@/data/usecases/add-objective/db-add-objective'
import { ObjectiveRepository } from '@/infra/db/objective/objective-repository'

export const makeDbAddObjective = (): AddObjective => {
  const objectiveRepository = new ObjectiveRepository()
  return new DbAddObjective(objectiveRepository, objectiveRepository)
}
