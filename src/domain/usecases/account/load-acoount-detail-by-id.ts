import { AccountDetailsModel } from '@/domain/models/account'

export interface LoadAccountDetailsById {
  loadById: (id: string) => Promise<AccountDetailsModel>
}
