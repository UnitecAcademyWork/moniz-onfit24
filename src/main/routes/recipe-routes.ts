import { Router } from 'express'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeAddRecipeController } from '../factories/controllers/recipe/add-recipe/add-recipe-controller-factory'

export default (router: Router): void => {
  router.post('/recipe', adminAuth, routeAdapter(makeAddRecipeController()))
}
