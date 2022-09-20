import { Account } from '../entities/account'
import { AccountDetailsModel, AccountModel } from '@/domain/models/account'
import { AddAccountDetailsModel, AddAccountModel } from '@/domain/usecases/account/add-account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { UpdateUserRoleRepository } from '@/data/protocols/db/account/update-user-role-repository'
import { AddAccountDetailsRepository } from '@/data/protocols/db/account/add-account-details-repository'
import { AccountDetails } from '../entities/account-details'
import { LoadAccountDetailsByIdRepository } from '@/data/protocols/db/account/load-account-details-by-id-repository'

export class AccountRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, UpdateUserRoleRepository, AddAccountDetailsRepository, LoadAccountDetailsByIdRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = new Account()
    account.name = accountData.name
    account.email = accountData.email
    account.password = accountData.password
    account.role = accountData.role
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

  async addAccountDetails (accountInfoData: AddAccountDetailsModel): Promise<AccountDetailsModel> {
    const account = await Account.findOneBy({ id: accountInfoData.accountId })
    if (account) {
      const accountDetails = new AccountDetails()
      accountDetails.account = account
      accountDetails.accountId = accountInfoData.accountId
      accountDetails.birth = accountInfoData.birth
      accountDetails.gender = accountInfoData.gender
      accountDetails.height = accountInfoData.height
      accountDetails.objective = accountInfoData.objective
      accountDetails.weight = accountInfoData.weight
      await AccountDetails.save(accountDetails)
      delete accountDetails.account
      return accountDetails
    }
    return null
  }

  async loadAccountDetailsById (accountId: string): Promise<AccountDetailsModel> {
    const accountDetails = await AccountDetails.findOneBy({ accountId })
    return accountDetails
  }
}
