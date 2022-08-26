import { DbAddAccountInfo } from './db-add-account-info'
import { AccountInfoModel, AddAccountInfoModel, AddAccountInfoRepository } from './db-add-account-info.protocols'

const makeFakeAccountInfoData = (): AddAccountInfoModel => ({
  accountId: 'any_AccountId',
  birth: 'any_date',
  gender: 'any_gender',
  height: 'any_height',
  objective: 'any_objective',
  weight: 'any_weight'
})

const makeFakeAccountInfo = (): AccountInfoModel => ({
  id: 'any_id',
  accountId: 'any_AccountId',
  birth: 'any_date',
  gender: 'any_gender',
  height: 'any_height',
  objective: 'any_objective',
  weight: 'any_weight'
})

const makeAddAccountInfoRepository = (): AddAccountInfoRepository => {
  class AddAccountInfoRepositoryStub implements AddAccountInfoRepository {
    async addAccountInfo (accountInfoData: AddAccountInfoModel): Promise<AccountInfoModel> {
      return Promise.resolve(makeFakeAccountInfo())
    }
  }
  return new AddAccountInfoRepositoryStub()
}

interface sutTypes {
  sut: DbAddAccountInfo
  addAccountInfoRepositoryStub: AddAccountInfoRepository
}

const makeSut = (): sutTypes => {
  const addAccountInfoRepositoryStub = makeAddAccountInfoRepository()
  const sut = new DbAddAccountInfo(addAccountInfoRepositoryStub)

  return { sut, addAccountInfoRepositoryStub }
}

describe('DbAddAccountInfo Repository', () => {
  test('should call addAccountInfoRepository with correct values', async () => {
    const { sut, addAccountInfoRepositoryStub } = makeSut()
    const addAccountInfoSpy = jest.spyOn(addAccountInfoRepositoryStub, 'addAccountInfo')
    await sut.add(makeFakeAccountInfoData())
    expect(addAccountInfoSpy).toHaveBeenCalledWith({
      accountId: 'any_AccountId',
      birth: 'any_date',
      gender: 'any_gender',
      height: 'any_height',
      objective: 'any_objective',
      weight: 'any_weight'
    })
  })
})
