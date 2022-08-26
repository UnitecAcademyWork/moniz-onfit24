import { Router } from 'express'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeAddAccountInfoController } from '../factories/controllers/account/info/account-info-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/account-info', auth, routeAdapter(makeAddAccountInfoController()))
}
