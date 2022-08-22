import { Decrypter } from '@/data/protocols/cryptography/descrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

describe('DbLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return Promise.resolve('any_value')
      }
    }
    const descrypterStub = new DecrypterStub()
    const decryptSpy = jest.spyOn(descrypterStub, 'decrypt')
    const sut = new DbLoadAccountByToken(descrypterStub)
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
