import { DbLoadAccountDetailsById } from '@/data/usecases/account/load-account-details-by-id/db-load-account-details-by-id'
import { LoadAccountDetailsById } from '@/domain/usecases/account/load-account-details-by-id'
import { AccountRepository } from '@/infra/db/account/account-repository'

export const makeDbLoadAccountDetails = (): LoadAccountDetailsById => {
  const accountRepository = new AccountRepository()
  return new DbLoadAccountDetailsById(accountRepository)
}
