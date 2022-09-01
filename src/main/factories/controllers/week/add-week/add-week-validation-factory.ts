import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddWeekValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['goals', 'exercises']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
