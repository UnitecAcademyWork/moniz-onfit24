import { ServerError } from '@/presentation/errors'
import { methodNotAllowed, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAccountInfoController } from './add-account-info-controller'
import { AccountInfoModel, AddAccountInfo, AddAccountInfoModel, HttpRequest } from './add-account-info.protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accountId: 'any_AccountId',
    birth: 'any_date',
    gender: 'any_gender',
    height: 'any_height',
    objective: 'any_objective',
    weight: 'any_weight'
  }
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
      accountId: 'any_AccountId',
      birth: 'any_date',
      gender: 'any_gender',
      height: 'any_height',
      objective: 'any_objective',
      weight: 'any_weight'
    })
  })

  test('should return 405 if AddAccountInfo returns null', async () => {
    const { sut, addAccountInfoStub } = makeSut()
    jest.spyOn(addAccountInfoStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(methodNotAllowed())
  })

  test('should return 500 if AddAccountInfo throws', async () => {
    const { sut, addAccountInfoStub } = makeSut()
    jest.spyOn(addAccountInfoStub, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('should return 200 if valida data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccountInfo()))
  })
})
