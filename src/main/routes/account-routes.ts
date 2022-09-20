import { Router } from 'express'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeAddAccountDetailsController } from '../factories/controllers/account/info/account-details-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/account-details', auth, routeAdapter(makeAddAccountDetailsController()))
}
