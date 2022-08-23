import { makeUploadValidation } from './upload-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols/validation'
import { FileTypeValidation } from '@/presentation/helpers/validators/file-type-validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('ObjectiveValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeUploadValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'size', 'tempFilePath', 'mimetype']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new FileTypeValidation('mimetype', 'image'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
