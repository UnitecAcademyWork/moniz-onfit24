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

  describe('add()', () => {
    test('should return an account on add success', async () => {
      const account = await makeAddAccount()
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
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
  })

  describe('updateAccessToken()', () => {
    test('should update the account accessToken on updateAccessToken success', async () => {
      const account = await makeAddAccount()
      const sut = makeSut()
      await sut.updateAccessToken(account.id, 'any_token')
      const result = await Account.findOneBy({ id: account.id })
      expect(result).toBeTruthy()
      expect(result.accessToken).toBe('any_token')
    })
  })

  describe('updateUserRole()', () => {
    test('should update the account role on updateUserRole success', async () => {
      const account = await makeAddAccount()
      const sut = makeSut()
      await sut.updateRole(account.id, 'any_role')
      const result = await Account.findOneBy({ id: account.id })
      expect(result).toBeTruthy()
      expect(result.role).toBe('any_role')
    })
  })

  describe('loadByToken()', () => {
    test('should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      const newAccount = await makeAddAccount()
      await sut.updateAccessToken(newAccount.id, 'any_token')
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      const newAccount = await makeAddAccount()
      await sut.updateAccessToken(newAccount.id, 'any_token')
      await sut.updateRole(newAccount.id, 'admin')
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      const newAccount = await makeAddAccount()
      await sut.updateAccessToken(newAccount.id, 'any_token')
      await sut.updateRole(newAccount.id, 'admin')
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return an account on loadByToken with user is admin', async () => {
      const sut = makeSut()
      const newAccount = await makeAddAccount()
      await sut.updateAccessToken(newAccount.id, 'any_token')
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })

    test('should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toBeFalsy()
    })
  })
})
