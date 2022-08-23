import { CloudnaryAdapter } from '@/utils/cloundnary-adapter'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { UploadController } from '@/presentation/controllers/upload/upload-controller'
import { Controller } from '@/presentation/protocols'

export const makeUploadController = (): Controller => {
  const cloudanryAdapter = new CloudnaryAdapter()
  const controller = new UploadController(cloudanryAdapter)
  return makeLogControllerDecorator(controller)
}
