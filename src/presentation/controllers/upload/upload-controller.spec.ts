import { UploadController } from './upload-controller'
import { FileUpload, File, HttpRequest } from './upload-controller.protocols'

describe('Upload Controller', () => {
  test('should call cloudnaryAdapter correct values', async () => {
    class FileUploadStub implements FileUpload {
      async upload (file: File): Promise<string> {
        return Promise.resolve('any_path')
      }
    }
    const fileUploadStub = new FileUploadStub()
    const uploadSpy = jest.spyOn(fileUploadStub, 'upload')
    const sut = new UploadController(fileUploadStub)
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
