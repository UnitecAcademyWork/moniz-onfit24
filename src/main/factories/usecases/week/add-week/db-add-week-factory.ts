import { DbAddWeek } from '@/data/usecases/week/add-week/db-add-week'
import { AddWeek } from '@/domain/usecases/week/add-week'
import { WeekRepository } from '@/infra/db/week/week-repository'

export const makeDbAddWeek = (): AddWeek => {
  const weekRepository = new WeekRepository()
  return new DbAddWeek(weekRepository)
}
