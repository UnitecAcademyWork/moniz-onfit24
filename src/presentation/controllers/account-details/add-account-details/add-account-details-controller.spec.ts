import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, methodNotAllowed, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAccountDetailsController } from './add-account-details-controller'
import { AccountDetailsModel, AddAccountDetails, AddAccountDetailsModel, HttpRequest, Validation } from './add-account-details-controller.protocols'

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

const makeFakeAccountInfo = (): AccountDetailsModel => ({
  id: 'any_id',
  accountId: 'any_AccountId',
  birth: 'any_date',
  gender: 'any_gender',
  height: 'any_height',
  objective: 'any_objective',
  weight: 'any_weight'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddAccountInfo = (): AddAccountDetails => {
  class AddAccountInfoStub implements AddAccountDetails {
    async add (accountInfo: AddAccountDetailsModel): Promise<AccountDetailsModel> {
      return Promise.resolve(makeFakeAccountInfo())
    }
  }
  return new AddAccountInfoStub()
}

interface sutTypes {
  sut: AddAccountDetailsController
  addAccountInfoStub: AddAccountDetails
  validationStub: Validation
}

const makeSut = (): sutTypes => {
  const addAccountInfoStub = makeAddAccountInfo()
  const validationStub = makeValidation()
  const sut = new AddAccountDetailsController(addAccountInfoStub, validationStub)

  return { sut, addAccountInfoStub, validationStub }
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

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
