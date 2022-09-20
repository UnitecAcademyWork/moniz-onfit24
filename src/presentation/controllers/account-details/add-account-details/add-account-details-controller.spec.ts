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

const makeFakeAccountDetails = (): AccountDetailsModel => ({
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

const makeAddAccountDetails = (): AddAccountDetails => {
  class AddAccountDetailsStub implements AddAccountDetails {
    async add (accountDetails: AddAccountDetailsModel): Promise<AccountDetailsModel> {
      return Promise.resolve(makeFakeAccountDetails())
    }
  }
  return new AddAccountDetailsStub()
}

interface sutTypes {
  sut: AddAccountDetailsController
  addAccountDetailsStub: AddAccountDetails
  validationStub: Validation
}

const makeSut = (): sutTypes => {
  const addAccountDetailsStub = makeAddAccountDetails()
  const validationStub = makeValidation()
  const sut = new AddAccountDetailsController(addAccountDetailsStub, validationStub)

  return { sut, addAccountDetailsStub, validationStub }
}

describe('Add Account Details Controller', () => {
  test('should call AddAccountDetails with correct values', async () => {
    const { sut, addAccountDetailsStub } = makeSut()
    const addSpy = jest.spyOn(addAccountDetailsStub, 'add')
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

  test('should return 405 if AddAccountDetails returns null', async () => {
    const { sut, addAccountDetailsStub } = makeSut()
    jest.spyOn(addAccountDetailsStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(methodNotAllowed())
  })

  test('should return 500 if AddAccountDetails throws', async () => {
    const { sut, addAccountDetailsStub } = makeSut()
    jest.spyOn(addAccountDetailsStub, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('should return 200 if valida data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccountDetails()))
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
