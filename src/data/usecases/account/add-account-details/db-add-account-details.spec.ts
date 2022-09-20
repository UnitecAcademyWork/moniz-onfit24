import { DbAddAccountDetails } from './db-add-account-details'
import { AccountDetailsModel, AddAccountDetailsModel, AddAccountDetailsRepository } from './db-add-account-details.protocols'

const makeFakeAccountDetailsData = (): AddAccountDetailsModel => ({
  accountId: 'any_AccountId',
  birth: 'any_date',
  gender: 'any_gender',
  height: 'any_height',
  objective: 'any_objective',
  weight: 'any_weight'
})

const makeFakeAccountDetails = (): AccountDetailsModel => ({
  id: 'any_id',
  accountId: 'any_AccountId',
  birth: 'any_date',
  gender: 'any_gender',
  height: 'any_height',
  objective: 'any_objective',
  weight: 'any_weight'
})

const makeAddAccountDetailsRepository = (): AddAccountDetailsRepository => {
  class AddAccountDetailsRepositoryStub implements AddAccountDetailsRepository {
    async addAccountDetails (accountDetailsData: AddAccountDetailsModel): Promise<AccountDetailsModel> {
      return Promise.resolve(makeFakeAccountDetails())
    }
  }
  return new AddAccountDetailsRepositoryStub()
}

interface sutTypes {
  sut: DbAddAccountDetails
  addAccountDetailsRepositoryStub: AddAccountDetailsRepository
}

const makeSut = (): sutTypes => {
  const addAccountDetailsRepositoryStub = makeAddAccountDetailsRepository()
  const sut = new DbAddAccountDetails(addAccountDetailsRepositoryStub)

  return { sut, addAccountDetailsRepositoryStub }
}

describe('DbAddAccountDetails Repository', () => {
  test('should call addAccountDetailsRepository with correct values', async () => {
    const { sut, addAccountDetailsRepositoryStub } = makeSut()
    const addAccountDetailsSpy = jest.spyOn(addAccountDetailsRepositoryStub, 'addAccountDetails')
    await sut.add(makeFakeAccountDetailsData())
    expect(addAccountDetailsSpy).toHaveBeenCalledWith({
      accountId: 'any_AccountId',
      birth: 'any_date',
      gender: 'any_gender',
      height: 'any_height',
      objective: 'any_objective',
      weight: 'any_weight'
    })
  })

  test('should return an account Details on success', async () => {
    const { sut } = makeSut()
    const accountDetails = await sut.add(makeFakeAccountDetailsData())
    expect(accountDetails).toEqual(makeFakeAccountDetails())
  })

  test('should return null if addAccountDetailsRepository returns null', async () => {
    const { sut, addAccountDetailsRepositoryStub } = makeSut()
    jest.spyOn(addAccountDetailsRepositoryStub, 'addAccountDetails').mockResolvedValueOnce(null)
    const accountDetails = await sut.add(makeFakeAccountDetailsData())
    expect(accountDetails).toBeNull()
  })
})
