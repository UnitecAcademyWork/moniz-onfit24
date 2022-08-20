import { AccountRepository } from './account-repository'
import { TypeormHelper } from '../typeorm-helper'
import { Account } from '../entities/account'
import { AccountModel } from '@/domain/models/account'

describe('Account Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  const makeAddAccount = async (): Promise<AccountModel> => {
    const sut = makeSut()
    return await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  }

  const makeSut = (): AccountRepository => {
    return new AccountRepository()
  }

  test('should return an account on add success', async () => {
    const account = await makeAddAccount()
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await makeAddAccount()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('should update the account accessToken on updateAccessToken success', async () => {
    const account = await makeAddAccount()
    const sut = makeSut()
    await sut.updateAccessToken(account.id, 'any_token')
    const result = await Account.findOneBy({ id: account.id })
    expect(result).toBeTruthy()
    expect(result.accessToken).toBe('any_token')
  })
})
