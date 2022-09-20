import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadAccountDetailsController } from './load-account-details-controller'
import { AccountDetailsModel, HttpRequest, LoadAccountDetailsById } from './load-account-details-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    accountId: 'any_id'
  }
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

const makeLoadAccountDetailsById = (): LoadAccountDetailsById => {
  class LoadAccountDetailsByIdStub implements LoadAccountDetailsById {
    async load (accountId: string): Promise<AccountDetailsModel> {
      return Promise.resolve(makeFakeAccountDetails())
    }
  }
  return new LoadAccountDetailsByIdStub()
}

interface SutTypes {
  loadAccountDetailsByIdStub: LoadAccountDetailsById
  sut: LoadAccountDetailsController
}

const makeSut = (): SutTypes => {
  const loadAccountDetailsByIdStub = makeLoadAccountDetailsById()
  const sut = new LoadAccountDetailsController(loadAccountDetailsByIdStub)
  return { sut, loadAccountDetailsByIdStub }
}

describe('LoadAccountDetails Controller', () => {
  test('should call LoadAccountDetailsById with correct value', async () => {
    const { sut, loadAccountDetailsByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountDetailsByIdStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return 403 if LoadAccountDetails returns null', async () => {
    const { sut, loadAccountDetailsByIdStub } = makeSut()
    jest.spyOn(loadAccountDetailsByIdStub, 'load').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('user inválido')))
  })

  test('should return 500 if LoadAccountDetails throws', async () => {
    const { sut, loadAccountDetailsByIdStub } = makeSut()
    jest.spyOn(loadAccountDetailsByIdStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccountDetails()))
  })
})
