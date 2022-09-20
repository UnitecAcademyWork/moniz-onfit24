import { AccountDetailsModel, LoadAccountDetailsById, LoadAccountDetailsByIdRepository } from './db-load-account-details-by-id.protocols'

export class DbLoadAccountDetailsById implements LoadAccountDetailsById {
  constructor (private readonly loadAccountDetailsByIdRepository: LoadAccountDetailsByIdRepository) {}

  async load (accountId: string): Promise<AccountDetailsModel> {
    const accountDetails = await this.loadAccountDetailsByIdRepository.loadById(accountId)
    return accountDetails
  }
}
