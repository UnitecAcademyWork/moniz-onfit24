import { WeekModel } from '@/domain/models/week'

export interface LoadWeekById {
  loadById: (weekId: string) => Promise<WeekModel>
}
