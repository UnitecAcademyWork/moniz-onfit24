import { Router } from 'express'
import { makeSignUpController } from '@/main/factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()))
  router.post('/login', routeAdapter(makeLoginController()))
}
