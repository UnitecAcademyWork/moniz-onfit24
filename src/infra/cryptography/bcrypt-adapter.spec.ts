import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adpter'

const salt: number = 12

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
