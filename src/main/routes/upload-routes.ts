import { Router } from 'express'
import { makeUploadController } from '@/main/factories/controllers/upload/upload-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/upload', routeAdapter(makeUploadController()))
}
