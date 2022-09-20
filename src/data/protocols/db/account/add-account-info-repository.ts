import { AccountDetailsModel } from '@/domain/models/account'
import { AddAccountDetailsModel } from '@/domain/usecases/account/add-account'

export interface AddAccountDetailsRepository {
  addAccountDetails: (accountDetailsData: AddAccountDetailsModel) => Promise<AccountDetailsModel>
}
