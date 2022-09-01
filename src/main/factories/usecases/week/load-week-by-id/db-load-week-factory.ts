import { DbLoadWeekById } from '@/data/usecases/week/load-week/db-load-week-by-id'
import { LoadWeekById } from '@/domain/usecases/week/load-week-by-id'
import { WeekRepository } from '@/infra/db/week/week-repository'

export const makeDbLoadWeek = (): LoadWeekById => {
  const weekRepository = new WeekRepository()
  return new DbLoadWeekById(weekRepository)
}
