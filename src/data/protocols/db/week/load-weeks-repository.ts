import { WeekModel } from '@/domain/models/week'

export interface LoadWeeksRepository {
  loadAll: () => Promise<WeekModel[]>
}
