import { Router } from 'express'
import { makeAddProgramController } from '@/main/factories/controllers/program/add-program/add-program-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/program', adminAuth, routeAdapter(makeAddProgramController()))
  router.get('/program/:programId', routeAdapter(makeAddProgramController()))
}
