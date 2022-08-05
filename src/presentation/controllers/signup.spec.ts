import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-errors'
import { InvalidParamError } from '../errors/invalid-param-errors'
import { badRequest } from '../helpers/bad-request'
import { EmailValidator } from '../protocols/email-validator'
import { ServerError } from '../errors/server-error'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})

test('should return 400 if no password is provided', () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
})

test('should return 400 if no passwordConfirmation is provided', () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
})

test('should return 400 if an invalid email is provided', () => {
  const { sut, emailValidatorStub } = makeSut()
  jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'invalid_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
})

test('should call EmailValidator with correct email', () => {
  const { sut, emailValidatorStub } = makeSut()
  const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  sut.handle(httpRequest)
  expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
})

test('should return 500 if EmailValidator throws', () => {
  const { sut, emailValidatorStub } = makeSut()
  jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse.body).toEqual(new ServerError())
})
