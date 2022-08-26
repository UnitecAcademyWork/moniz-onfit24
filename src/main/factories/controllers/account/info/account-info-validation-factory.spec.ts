import { makeAddAccountInfoValidation } from './account-info-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'
import { DateValidation } from '@/presentation/helpers/validators/date-validation'
import { DateValidator } from '@/presentation/protocols/Date-validator'
import { FloatValidator } from '@/presentation/protocols/float-validator'
import { FloatValidation } from '@/presentation/helpers/validators/float-validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isDate (date: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}

const makeFloatValidator = (): FloatValidator => {
  class FloatValidatorStub implements FloatValidator {
    isFloat (number: string): boolean {
      return true
    }
  }
  return new FloatValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddAccountInfoValidation()
    const validations: Validation[] = []
    for (const field of ['accountId', 'birth', 'weight', 'height', 'gender', 'objective']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new DateValidation('birth', makeDateValidator()))
    validations.push(new FloatValidation('weight', makeFloatValidator()))
    validations.push(new FloatValidation('height', makeFloatValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
