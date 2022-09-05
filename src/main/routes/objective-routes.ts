import { Router } from 'express'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeAddObjectiveController } from '../factories/controllers/objective/add-objective/objective-controller-factory'
import { makeLoadObjectiveController } from '../factories/controllers/objective/load-all-objective/load-all-objectives-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/objective', adminAuth, routeAdapter(makeAddObjectiveController()))
  router.get('/objective', auth, routeAdapter(makeLoadObjectiveController()))
}
