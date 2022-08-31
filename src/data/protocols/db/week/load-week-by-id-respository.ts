import { WeekModel } from '@/domain/models/week'

export interface LoadWeekByIdRepository {
  loadById: (weekId: string) => Promise<WeekModel>
}
