import { Router } from 'express'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeAddAccountDetailsController } from '../factories/controllers/account/add-account-details/account-details-controller-factory'
import { makeLoadAccountDetailsController } from '../factories/controllers/account/load-account-details/load-account-details-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/account-details', auth, routeAdapter(makeAddAccountDetailsController()))
  router.get('/account-details/:accountId', auth, routeAdapter(makeLoadAccountDetailsController()))
}
