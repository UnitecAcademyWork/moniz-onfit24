import { Router } from 'express'
import { makeAddProgramController } from '@/main/factories/controllers/program/add-program/add-program-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeLoadProgramController } from '../factories/controllers/program/load-program/load-program-controller-factory'
import { makeLoadProgramsController } from '../factories/controllers/program/load-programs/load-programs-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/program', adminAuth, routeAdapter(makeAddProgramController()))
  router.get('/program', auth, routeAdapter(makeLoadProgramsController()))
  router.get('/program/:programId', auth, routeAdapter(makeLoadProgramController()))
}
