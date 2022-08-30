import { AddObjective } from '@/domain/usecases/objective/add-objective'
import { DbAddObjective } from '@/data/usecases/objective/add-objective/db-add-objective'
import { ObjectiveRepository } from '@/infra/db/objective/objective-repository'

export const makeDbAddObjective = (): AddObjective => {
  const objectiveRepository = new ObjectiveRepository()
  return new DbAddObjective(objectiveRepository, objectiveRepository)
}
