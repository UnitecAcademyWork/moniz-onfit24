import { DbLoadAccountDetailsById } from './db-load-account-details-by-id'
import { AccountDetailsModel, LoadAccountDetailsByIdRepository } from './db-load-account-details-by-id.protocols'

const makeFakeAccountDetails = (): AccountDetailsModel => ({
  id: 'any_id',
  accountId: 'any_AccountId',
  birth: 'any_date',
  gender: 'any_gender',
  height: 'any_height',
  objective: 'any_objective',
  weight: 'any_weight'
})

const makeLoadAccountDetailsByIdRepository = (): LoadAccountDetailsByIdRepository => {
  class LoadAccountDetailsByIdRepositoryStub implements LoadAccountDetailsByIdRepository {
    async loadAccountDetailsById (accountId: string): Promise<AccountDetailsModel> {
      return Promise.resolve(makeFakeAccountDetails())
    }
  }
  return new LoadAccountDetailsByIdRepositoryStub()
}

interface SutTypes {
  loadAccountDetailsByIdRepositoryStub: LoadAccountDetailsByIdRepository
  sut: DbLoadAccountDetailsById
}

const makeSut = (): SutTypes => {
  const loadAccountDetailsByIdRepositoryStub = makeLoadAccountDetailsByIdRepository()
  const sut = new DbLoadAccountDetailsById(loadAccountDetailsByIdRepositoryStub)

  return { sut, loadAccountDetailsByIdRepositoryStub }
}

describe('AccountDetailsById', () => {
  test('should call LoadAccountDetailsByIdRepository with correct values', async () => {
    const { sut, loadAccountDetailsByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountDetailsByIdRepositoryStub, 'loadAccountDetailsById')
    await sut.load('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return a accountDetails on success', async () => {
    const { sut } = makeSut()
    const accountDetails = await sut.load('any_id')
    expect(accountDetails).toEqual(makeFakeAccountDetails())
  })

  test('should throw if LoadAccountDetailsByIdRepository throws', async () => {
    const { sut, loadAccountDetailsByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountDetailsByIdRepositoryStub, 'loadAccountDetailsById').mockRejectedValueOnce(new Error())
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })
})
