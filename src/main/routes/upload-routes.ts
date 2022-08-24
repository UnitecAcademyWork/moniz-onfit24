import { Router } from 'express'
import { makeUploadController } from '@/main/factories/controllers/upload/upload-controller-factory'
import { routeAdapter } from '../adapters/express-route-adapter'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/upload', auth, routeAdapter(makeUploadController()))
}
