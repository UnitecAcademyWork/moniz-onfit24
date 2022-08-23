import { Router } from 'express'
import { makeUploadController } from '@/main/factories/controllers/upload/upload-controller-factory'
import { routeUploadAdapter } from '@/main/adapters/express-upload-route-adapter'

export default (router: Router): void => {
  router.post('/upload', routeUploadAdapter(makeUploadController()))
}
