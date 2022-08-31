import { Router } from 'express'
import { makeAddWeekController } from '@/main/factories/controllers/week/add-week/add-week-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { makeUpdateProgramController } from '../factories/controllers/program/update-program/add-program-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/week', adminAuth, routeAdapter(makeAddWeekController()))
  router.put('/week/:weekId', adminAuth, routeAdapter(makeUpdateProgramController()))
}
