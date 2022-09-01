import { WeekModel } from '@/domain/models/week'

export interface LoadWeeks {
  loadAll: () => Promise<WeekModel[]>
}
