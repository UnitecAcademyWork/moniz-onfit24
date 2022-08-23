import { Router } from 'express'
import { makeUploadController } from '@/main/factories/controllers/upload/upload-controller-factory'
import { routeUploadAdapter } from '@/main/adapters/express-upload-route-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/upload', auth, routeUploadAdapter(makeUploadController()))
}
