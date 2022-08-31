import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddWeekValidation } from './add-week-validation-factory'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('AddWeekValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddWeekValidation()
    const validations: Validation[] = []
    for (const field of ['programId', 'goals', 'exercises']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
