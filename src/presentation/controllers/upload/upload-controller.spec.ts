import { UploadController } from './upload-controller'
import { FileUpload, File, HttpRequest } from './upload-controller.protocols'

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
}

const makeSut = (): sutTypes => {
  const fileUploadStub = makeFileUpload()
  const sut = new UploadController(fileUploadStub)
  return { sut, fileUploadStub }
}

describe('Upload Controller', () => {
  test('should call cloudnaryAdapter correct values', async () => {
    const { sut, fileUploadStub } = makeSut()
    const uploadSpy = jest.spyOn(fileUploadStub, 'upload')
    const httpRequest: HttpRequest = {
      body: {
        file: {
          name: '857716.jpg',
          data: Buffer.from('any_value'),
          size: 581426,
          encoding: '7bit',
          tempFilePath: 'any_type',
          truncated: false,
          mimetype: 'image/jpeg',
          md5: '44df16492d29fcc3ad9ba1a3833d3a3d'
        }
      }
    }
    await sut.handle(httpRequest)
    expect(uploadSpy).toHaveBeenCalledWith({
      name: '857716.jpg',
      size: 581426,
      tempFilePath: 'any_type',
      mimetype: 'image/jpeg'
    })
  })
})
