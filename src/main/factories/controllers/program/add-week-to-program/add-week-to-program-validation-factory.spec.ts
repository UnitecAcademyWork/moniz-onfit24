import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddWeekToProgramValidation } from './add-week-to-program-validation-factory'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('AddProgramValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddWeekToProgramValidation()
    const validations: Validation[] = []
    for (const field of ['programId', 'weekId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
