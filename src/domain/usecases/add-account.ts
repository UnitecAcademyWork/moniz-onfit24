import { AccountInfoModel, AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccountInfoModel {
  birth: string
  weight: string
  height: string
  gender: string
  objective: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}

export interface AddAccountInfo {
  add: (accountInfo: AddAccountInfoModel) => Promise<AccountInfoModel>
}
