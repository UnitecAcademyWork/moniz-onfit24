
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeObjectiveValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'icon', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
