import { Router } from 'express'
import { makeAddProgramController } from '@/main/factories/controllers/program/add-program/add-program-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { makeLoadProgramController, makeLoadProgramWeeksController } from '../factories/controllers/program/load-program/load-program-controller-factory'
import { makeLoadProgramsController } from '../factories/controllers/program/load-all-programs/load-all-programs-controller-factory'
import { auth } from '../middlewares/auth'
import { makeUpdateProgramController } from '../factories/controllers/program/update-program/add-program-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { makeDeleteProgramController } from '../factories/controllers/program/delete-program/delete-program-controller-factory'
import { makeAddWeekToProgramController } from '../factories/controllers/program/add-week-to-program/add-week-to-program-controller-factory'

export default (router: Router): void => {
  router.post('/program', adminAuth, routeAdapter(makeAddProgramController()))
  router.put('/program/:programId', adminAuth, routeAdapter(makeUpdateProgramController()))
  router.get('/program', auth, routeAdapter(makeLoadProgramsController()))
  router.get('/program/:programId', auth, routeAdapter(makeLoadProgramController()))
  router.delete('/program/:programId', adminAuth, routeAdapter(makeDeleteProgramController()))
  router.post('/program-week', adminAuth, routeAdapter(makeAddWeekToProgramController()))
  router.get('/program-week', auth, routeAdapter(makeLoadProgramWeeksController()))
}
