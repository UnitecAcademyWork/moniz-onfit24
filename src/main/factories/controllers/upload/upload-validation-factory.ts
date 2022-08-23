
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
import { FileTypeValidation } from '@/presentation/helpers/validators/file-type-validation'
import { Validation } from '@/presentation/protocols/validation'

export const makeUploadValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'size', 'tempFilePath', 'mimetype']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new FileTypeValidation('mimetype', 'image'))
  return new ValidationComposite(validations)
}
