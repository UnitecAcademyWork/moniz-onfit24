import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { UploadController } from './upload-controller'
import { FileUpload, File, HttpRequest, Validation } from './upload-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: '857716.jpg',
    data: Buffer.from('any_value'),
    size: 581426,
    encoding: '7bit',
    tempFilePath: 'any_type',
    truncated: false,
    mimetype: 'image/jpeg',
    md5: '44df16492d29fcc3ad9ba1a3833d3a3d'

  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFileUpload = (): FileUpload => {
  class FileUploadStub implements FileUpload {
    async upload (file: File): Promise<string> {
      return Promise.resolve('any_path')
    }
  }
  return new FileUploadStub()
}
interface sutTypes {
  sut: UploadController
  fileUploadStub: FileUpload
  validationStub: Validation
}

const makeSut = (): sutTypes => {
  const fileUploadStub = makeFileUpload()
  const validationStub = makeValidation()
  const sut = new UploadController(fileUploadStub, validationStub)
  return { sut, fileUploadStub, validationStub }
}

describe('Upload Controller', () => {
  test('should call cloudnaryAdapter correct values', async () => {
    const { sut, fileUploadStub } = makeSut()
    const uploadSpy = jest.spyOn(fileUploadStub, 'upload')
    await sut.handle(makeFakeRequest())
    expect(uploadSpy).toHaveBeenCalledWith({
      name: '857716.jpg',
      size: 581426,
      tempFilePath: 'any_type',
      mimetype: 'image/jpeg'
    })
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should return 500 if FileUpload throws', async () => {
    const { sut, fileUploadStub } = makeSut()
    jest.spyOn(fileUploadStub, 'upload').mockImplementationOnce(async () => { return Promise.reject(new Error()) })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ url: 'any_path' }))
  })
})
