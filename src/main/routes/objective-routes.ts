import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeAddObjectiveController } from '../factories/controllers/objective/add-objective/objective-controller-factory'
import { makeLoadObjectiveController } from '../factories/controllers/objective/load-objective/load-objective-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/objective', adminAuth, routeAdapter(makeAddObjectiveController()))
  router.get('/objective', auth, routeAdapter(makeLoadObjectiveController()))
}
