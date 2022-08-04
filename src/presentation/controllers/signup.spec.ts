import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-errors'
import { badRequest } from '../helpers/bad-request'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = makeSut()
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
    const sut = makeSut()
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
  const sut = makeSut()
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
  const sut = makeSut()
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