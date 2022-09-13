import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDeleteProgramWeekValidation } from './delete-program-week-validation-factory'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('AddProgramValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeDeleteProgramWeekValidation()
    const validations: Validation[] = []
    for (const field of ['programId', 'weekId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
