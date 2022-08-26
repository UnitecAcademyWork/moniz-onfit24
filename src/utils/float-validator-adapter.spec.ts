import { FloatValidatorAdapter } from './float-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isFloat (): boolean {
    return true
  }
}))

const makeSut = (): FloatValidatorAdapter => {
  return new FloatValidatorAdapter()
}

describe('FloatValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isFloat').mockReturnValueOnce(false)
    const isFloatSpy = sut.isFloat('invalid_number')
    expect(isFloatSpy).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isFloat = sut.isFloat('valid_number')
    expect(isFloat).toBe(true)
  })

  test('should call validator with correct number', () => {
    const sut = makeSut()
    const isFloatSpy = jest.spyOn(validator, 'isFloat')
    sut.isFloat('any_number')
    expect(isFloatSpy).toHaveBeenCalledWith('any_number')
  })
})
