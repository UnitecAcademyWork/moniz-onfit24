import { AddAccountDetails } from '@/domain/usecases/account/add-account'
import { AccountRepository } from '@/infra/db/account/account-repository'
import { DbAddAccountDetails } from '@/data/usecases/account/add-account-details/db-add-account-details'

export const makeDbAddAccountDetails = (): AddAccountDetails => {
  const addAccountDetailsRepository = new AccountRepository()
  return new DbAddAccountDetails(addAccountDetailsRepository)
}
