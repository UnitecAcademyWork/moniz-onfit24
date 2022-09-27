import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddCategoryValidation } from './add-category-validation-factory'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('AddCategoryValidation Factory', () => {
  test('should call validationComposite with all validations', () => {
    makeAddCategoryValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'img', 'description']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
