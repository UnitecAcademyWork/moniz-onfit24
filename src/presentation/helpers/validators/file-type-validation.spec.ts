import { InvalidParamError } from '../../errors'
import { FileTypeValidation } from './file-type-validation'

const makeSut = (): FileTypeValidation => {
  return new FileTypeValidation('mimetype', 'image')
}

describe('FileType Validation', () => {
  test('should return a InvalidaParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ mimetype: 'wrong_type' })
    expect(error).toEqual(new InvalidParamError('mimetype'))
  })

  test('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ mimetype: 'image/jpeg' })
    expect(error).toBeFalsy()
  })
})
