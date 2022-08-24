import { AddAccountInfoController } from './add-account-info-controller'
import { AccountInfoModel, AddAccountInfo, AddAccountInfoModel, HttpRequest } from './add-account-info.protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    birth: 'any_date',
    gender: 'any_gender',
    height: 'any_height',
    objective: 'any_objective',
    weight: 'any_weight'
  }
})

const makeFakeAccountInfo = (): AccountInfoModel => ({
  id: 'any_id',
  birth: 'any_date',
  gender: 'any_gender',
  height: 'any_height',
  objective: 'any_objective',
  weight: 'any_weight'
})

const makeAddAccountInfo = (): AddAccountInfo => {
  class AddAccountInfoStub implements AddAccountInfo {
    async add (accountInfo: AddAccountInfoModel): Promise<AccountInfoModel> {
      return Promise.resolve(makeFakeAccountInfo())
    }
  }
  return new AddAccountInfoStub()
}

interface sutTypes {
  sut: AddAccountInfoController
  addAccountInfoStub: AddAccountInfo
}

const makeSut = (): sutTypes => {
  const addAccountInfoStub = makeAddAccountInfo()
  const sut = new AddAccountInfoController(addAccountInfoStub)

  return { sut, addAccountInfoStub }
}

describe('Add Account Info Controller', () => {
  test('should call AddAccountInfo with correct values', async () => {
    const { sut, addAccountInfoStub } = makeSut()
    const addSpy = jest.spyOn(addAccountInfoStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      birth: 'any_date',
      gender: 'any_gender',
      height: 'any_height',
      objective: 'any_objective',
      weight: 'any_weight'
    })
  })
})
