import { ObjectiveRepository } from '@/infra/db/objective/objective-repository'
import { DbLoadObjectives } from '@/data/usecases/load-objectives/db-load-objectives'
import { LoadObjectives } from '@/domain/usecases/load-objectives'

export const makeDbLoadObjectives = (): LoadObjectives => {
  const objectiveRepository = new ObjectiveRepository()
  return new DbLoadObjectives(objectiveRepository)
}
