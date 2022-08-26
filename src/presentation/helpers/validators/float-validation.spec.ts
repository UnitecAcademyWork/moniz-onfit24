import { FloatValidator } from '../../protocols/float-validator'
import { FloatValidation } from './float-validation'
import { InvalidParamError } from '../../errors'

const makeFloatValidator = (): FloatValidator => {
  class FloatValidatorStub implements FloatValidator {
    isFloat (number: string): boolean {
      return true
    }
  }
  return new FloatValidatorStub()
}

interface SutTypes {
  sut: FloatValidation
  floatValidatorStub: FloatValidator
}

const makeSut = (): SutTypes => {
  const floatValidatorStub = makeFloatValidator()
  const sut = new FloatValidation('number', floatValidatorStub)
  return {
    sut,
    floatValidatorStub
  }
}

describe('Float Validation', () => {
  test('should return an error if FloatValidator returns false', () => {
    const { sut, floatValidatorStub } = makeSut()
    jest.spyOn(floatValidatorStub, 'isFloat').mockReturnValueOnce(false)
    const error = sut.validate({ number: 'any_number' })
    expect(error).toEqual(new InvalidParamError('number'))
  })

  test('should call FloatValidator with correct number', () => {
    const { sut, floatValidatorStub } = makeSut()
    const isFloatSpy = jest.spyOn(floatValidatorStub, 'isFloat').mockReturnValueOnce(false)
    sut.validate({ number: 'any_number' })
    expect(isFloatSpy).toHaveBeenCalledWith('any_number')
  })

  test('should throw if FloatValidator throws', async () => {
    const { sut, floatValidatorStub } = makeSut()
    jest.spyOn(floatValidatorStub, 'isFloat').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
