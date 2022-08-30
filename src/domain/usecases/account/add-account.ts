import { AccountInfoModel, AccountModel } from '../../models/account'

export type AddAccountModel = Omit<AccountModel, 'id'>

export type AddAccountInfoModel = Omit<AccountInfoModel, 'id'>

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}

export interface AddAccountInfo {
  add: (accountInfo: AddAccountInfoModel) => Promise<AccountInfoModel>
}
