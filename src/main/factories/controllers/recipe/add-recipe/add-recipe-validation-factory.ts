
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddRecipeValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'description', 'prepTime', 'cookTime', 'difficulty', 'serves', 'url', 'nutrition', 'tags', 'ingredients', 'steps']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
