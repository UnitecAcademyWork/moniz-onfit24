import { WeekModel } from '@/domain/models/week'
import { AddWeekModel } from '@/domain/usecases/week/add-week'

export interface AddWeekRepository {
  add: (week: AddWeekModel, weekId: string) => Promise<WeekModel>
}
