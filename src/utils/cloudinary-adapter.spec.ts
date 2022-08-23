import { CloudinaryAdapter } from './cloudinary-adapter'
import { v2 as cloudinary } from 'cloudinary'

// jest.mock('cloudinary.uploader', () => ({
//   upload (): any {
//     return 'valid_url'
//   }
// }))

const makeSut = (): CloudinaryAdapter => {
  return new CloudinaryAdapter()
}

describe('EmailValidator Adapter', () => {
  test.skip('should return true if validator returns a url', () => {
    const sut = makeSut()
    const url = sut.upload({ name: 'any_name', mimetype: 'any_type', size: 0, tempFilePath: 'any_path' })
    expect(url).toBe('valid_url')
  })

  test.skip('should call validator with correct email', async () => {
    const sut = makeSut()
    const uploadSpy = jest.spyOn(cloudinary.uploader, 'upload')
    await sut.upload({ name: 'any_name', mimetype: 'any_type', size: 0, tempFilePath: 'any_path' })
    expect(uploadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
