import { AccountDetailsModel, AccountModel } from '../../models/account'

export type AddAccountModel = Omit<AccountModel, 'id'>

export type AddAccountDetailsModel = Omit<AccountDetailsModel, 'id'>

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}

export interface AddAccountDetails {
  add: (accountInfo: AddAccountDetailsModel) => Promise<AccountDetailsModel>
}
