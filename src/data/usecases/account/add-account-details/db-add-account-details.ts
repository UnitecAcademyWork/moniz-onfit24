import { AccountDetailsModel, AddAccountDetails, AddAccountDetailsModel, AddAccountDetailsRepository } from './db-add-account-details.protocols'

export class DbAddAccountDetails implements AddAccountDetails {
  constructor (private readonly addAccountDetailsRepository: AddAccountDetailsRepository) {}

  async add (accountDetailsData: AddAccountDetailsModel): Promise<AccountDetailsModel> {
    const accountDetails = await this.addAccountDetailsRepository.addAccountDetails(accountDetailsData)
    if (accountDetails) {
      return accountDetails
    }
    return null
  }
}
