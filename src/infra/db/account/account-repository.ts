import { Account } from '../entities/account'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { UpdateUserRoleRepository } from '@/data/protocols/db/account/update-user-role-repository'

export class AccountRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, UpdateUserRoleRepository {
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

  async updateRole (id: string, role: string): Promise<void> {
    const account = await Account.findOneBy({ id })
    account.role = role
    await Account.save(account)
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const account = await Account.findOneBy({ accessToken: token, role })
    return account
  }
}
