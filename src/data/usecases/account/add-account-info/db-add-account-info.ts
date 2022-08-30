import { AccountInfoModel, AddAccountInfo, AddAccountInfoModel, AddAccountInfoRepository } from './db-add-account-info.protocols'

export class DbAddAccountInfo implements AddAccountInfo {
  constructor (private readonly addAccountInfoRepository: AddAccountInfoRepository) {}

  async add (accountInfoData: AddAccountInfoModel): Promise<AccountInfoModel> {
    const accountInfo = await this.addAccountInfoRepository.addAccountInfo(accountInfoData)
    if (accountInfo) {
      return accountInfo
    }
    return null
  }
}
