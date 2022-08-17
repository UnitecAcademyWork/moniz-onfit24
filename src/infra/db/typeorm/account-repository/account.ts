import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/update-access-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { Account } from '../entities/account'

export class AccountRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = new Account()
    account.name = accountData.name
    account.email = accountData.email
    account.password = accountData.password
    const result = await account.save()
    return result
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = await Account.findOneBy({ email })
    return account
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const account = await Account.findOneBy({ id })
    account.accessToken = token
    await Account.save(account)
  }
}
