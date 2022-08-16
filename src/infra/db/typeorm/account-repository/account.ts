import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { Account } from '../entities/account'

export class AccountRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = new Account()
    account.name = accountData.name
    account.email = accountData.email
    account.password = accountData.password
    const result = await account.save()
    return result
  }
}
