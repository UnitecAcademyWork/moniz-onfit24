import { CloudinaryAdapter } from '@/utils/cloudinary-adapter'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { UploadController } from '@/presentation/controllers/upload/upload-controller'
import { Controller } from '@/presentation/protocols'
import { makeUploadValidation } from './upload-validation-factory'

export const makeUploadController = (): Controller => {
  const cloudinaryAdapter = new CloudinaryAdapter()
  const controller = new UploadController(cloudinaryAdapter, makeUploadValidation())
  return makeLogControllerDecorator(controller)
}
