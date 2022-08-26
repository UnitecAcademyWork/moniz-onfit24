import { DateValidatorAdapter } from './date-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isDate (): boolean {
    return true
  }
}))

const makeSut = (): DateValidatorAdapter => {
  return new DateValidatorAdapter()
}

describe('DateValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isDate').mockReturnValueOnce(false)
    const isDateSpy = sut.isDate('invalid_date')
    expect(isDateSpy).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isDate = sut.isDate('valid_date')
    expect(isDate).toBe(true)
  })

  test('should call validator with correct date', () => {
    const sut = makeSut()
    const isDateSpy = jest.spyOn(validator, 'isDate')
    sut.isDate('any_date')
    expect(isDateSpy).toHaveBeenCalledWith('any_date')
  })
})
