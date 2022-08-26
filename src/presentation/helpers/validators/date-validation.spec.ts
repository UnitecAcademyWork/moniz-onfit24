import { DateValidator } from '../../protocols/date-validator'
import { DateValidation } from './date-validation'
import { InvalidParamError } from '../../errors'

const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isDate (date: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}

interface SutTypes {
  sut: DateValidation
  dateValidatorStub: DateValidator
}

const makeSut = (): SutTypes => {
  const dateValidatorStub = makeDateValidator()
  const sut = new DateValidation('date', dateValidatorStub)
  return {
    sut,
    dateValidatorStub
  }
}

describe('Date Validation', () => {
  test('should return an error if DateValidator returns false', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isDate').mockReturnValueOnce(false)
    const error = sut.validate({ date: 'any_date' })
    expect(error).toEqual(new InvalidParamError('date'))
  })

  test('should call DateValidator with correct date', () => {
    const { sut, dateValidatorStub } = makeSut()
    const isDateSpy = jest.spyOn(dateValidatorStub, 'isDate').mockReturnValueOnce(false)
    sut.validate({ date: 'any_date' })
    expect(isDateSpy).toHaveBeenCalledWith('any_date')
  })

  test('should throw if DateValidator throws', async () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isDate').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
