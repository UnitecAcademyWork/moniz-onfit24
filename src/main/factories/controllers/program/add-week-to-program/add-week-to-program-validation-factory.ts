import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddWeekToProgramValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['programId', 'weekId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
