import { Router } from 'express'
import { makeAddWeekController } from '@/main/factories/controllers/week/add-week/add-week-controller-factory'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeUpdateWeekController } from '../factories/controllers/week/update-week/update-week-controller-factory'

export default (router: Router): void => {
  router.post('/week', adminAuth, routeAdapter(makeAddWeekController()))
  router.put('/week/:weekId', adminAuth, routeAdapter(makeUpdateWeekController()))
}
