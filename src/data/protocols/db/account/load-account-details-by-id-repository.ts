import { AccountDetailsModel } from '@/domain/models/account'

export interface LoadAccountDetailsByIdRepository {
  loadById: (accountId: string) => Promise<AccountDetailsModel>
}
