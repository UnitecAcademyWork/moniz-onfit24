import { makeAddObjectiveValidation } from './objective-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('ObjectiveValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddObjectiveValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'icon', 'description']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
