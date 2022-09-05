import { Router } from 'express'
import { makeAddWeekController } from '@/main/factories/controllers/week/add-week/add-week-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeUpdateWeekController } from '../factories/controllers/week/update-week/update-week-controller-factory'
import { makeLoadWeekController } from '../factories/controllers/week/load-week/load-week-controller-factory'
import { makeLoadWeeksRepository } from '../factories/controllers/week/load-weeks/load-all-weeks-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/week', adminAuth, routeAdapter(makeAddWeekController()))
  router.put('/week/:weekId', adminAuth, routeAdapter(makeUpdateWeekController()))
  router.get('/week/:weekId', auth, routeAdapter(makeLoadWeekController()))
  router.get('/week', auth, routeAdapter(makeLoadWeeksRepository()))
}
