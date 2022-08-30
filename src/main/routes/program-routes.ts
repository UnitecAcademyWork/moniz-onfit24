import { Router } from 'express'
import { makeAddProgramController } from '@/main/factories/controllers/program/add-program/add-program-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { makeLoadProgramController } from '../factories/controllers/program/load-program/load-program-controller-factory'
import { makeLoadProgramsController } from '../factories/controllers/program/load-programs/load-programs-controller-factory'
import { auth } from '../middlewares/auth'
import { makeUpdateProgramController } from '../factories/controllers/program/update-program/add-program-controller-factory'

export default (router: Router): void => {
  router.post('/program', auth, routeAdapter(makeAddProgramController()))
  router.put('/program/:programId', routeAdapter(makeUpdateProgramController()))
  router.get('/program', auth, routeAdapter(makeLoadProgramsController()))
  router.get('/program/:programId', auth, routeAdapter(makeLoadProgramController()))
}
