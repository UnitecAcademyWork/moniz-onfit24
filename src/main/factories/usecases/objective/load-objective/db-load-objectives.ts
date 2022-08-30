import { ObjectiveRepository } from '@/infra/db/objective/objective-repository'
import { DbLoadObjectives } from '@/data/usecases/objective/load-objectives/db-load-objectives'
import { LoadObjectives } from '@/domain/usecases/objective/load-objectives'

export const makeDbLoadObjectives = (): LoadObjectives => {
  const objectiveRepository = new ObjectiveRepository()
  return new DbLoadObjectives(objectiveRepository)
}
