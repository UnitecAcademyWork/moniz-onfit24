import { Router } from 'express'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeObjectiveController } from '../factories/controllers/objective/objective-controller-factory'

export default (router: Router): void => {
  router.post('/objective', routeAdapter(makeObjectiveController()))
}
