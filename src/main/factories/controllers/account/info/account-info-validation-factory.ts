import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { FloatValidation } from '@/presentation/helpers/validators/float-validation'
import { Validation } from '@/presentation/protocols/validation'
import { FloatValidatorAdapter } from '@/utils/float-validator-adapter'

export const makeAddAccountInfoValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['accountId', 'birth', 'weight', 'height', 'gender', 'objective']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new FloatValidation('weight', new FloatValidatorAdapter()))
  validations.push(new FloatValidation('height', new FloatValidatorAdapter()))
  return new ValidationComposite(validations)
}
