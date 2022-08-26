import { AddAccountInfo } from '@/domain/usecases/add-account'
import { AccountRepository } from '@/infra/db/account/account-repository'
import { DbAddAccountInfo } from '@/data/usecases/add-account-info/db-add-account-info'

export const makeDbAddAccountInfo = (): AddAccountInfo => {
  const addAccountInfoRepository = new AccountRepository()
  return new DbAddAccountInfo(addAccountInfoRepository)
}
