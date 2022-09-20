import { AccountDetailsModel } from '@/domain/models/account'

export interface LoadAccountDetailsById {
  load: (id: string) => Promise<AccountDetailsModel>
}
