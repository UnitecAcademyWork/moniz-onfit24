import { makeAddRecipeValidation } from './add-recipe-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('AddRecipeValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddRecipeValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'description', 'prepTime', 'cookTime', 'difficulty', 'serves', 'url', 'nutrition', 'tags', 'ingredients', 'steps']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
