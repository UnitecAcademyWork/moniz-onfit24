import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddProgramValidation } from './add-program-validation-factory'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('AddProgramValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddProgramValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'description', 'difficulty']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
