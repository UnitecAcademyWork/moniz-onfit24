import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeObjectiveController } from '../factories/controllers/objective/objective-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/objective', adminAuth, routeAdapter(makeObjectiveController()))
}
