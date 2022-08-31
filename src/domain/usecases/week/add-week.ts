import { WeekModel } from '@/domain/models/week'

export type AddWeekModel = Omit<WeekModel, 'id'>

export interface AddWeek {
  add: (week: AddWeekModel, id?: string) => Promise<WeekModel>
}
