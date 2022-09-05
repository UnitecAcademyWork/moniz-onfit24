import { DbLoadWeeks } from '@/data/usecases/week/load-all-weeks/db-all-load-weeks'
import { LoadWeeks } from '@/domain/usecases/week/load-all-weeks'
import { WeekRepository } from '@/infra/db/week/week-repository'

export const makeDbLoadWeeks = (): LoadWeeks => {
  const weeksRepository = new WeekRepository()
  return new DbLoadWeeks(weeksRepository)
}
