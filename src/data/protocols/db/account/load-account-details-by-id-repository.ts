import { AccountDetailsModel } from '@/domain/models/account'

export interface LoadAccountDetailsByIdRepository {
  loadAccountDetailsById: (accountId: string) => Promise<AccountDetailsModel>
}
