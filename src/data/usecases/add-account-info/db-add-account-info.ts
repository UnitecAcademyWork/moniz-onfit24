import { AccountInfoModel, AddAccountInfo, AddAccountInfoModel, AddAccountInfoRepository } from './db-add-account-info.protocols'

export class DbAddAccountInfo implements AddAccountInfo {
  constructor (private readonly addAccountInfoRepository: AddAccountInfoRepository) {}

  async add (accountInfo: AddAccountInfoModel): Promise<AccountInfoModel> {
    await this.addAccountInfoRepository.addAccountInfo(accountInfo)
    return null
  }
}
