import { Router } from 'express'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeAddRecipeController } from '../factories/controllers/recipe/add-recipe/add-recipe-controller-factory'
import { auth } from '../middlewares/auth'
import { makeLoadRecipesController } from '../factories/controllers/recipe/load-all-recipes/load-all-recipes-controller-factory'

export default (router: Router): void => {
  router.post('/recipe', adminAuth, routeAdapter(makeAddRecipeController()))
  router.get('/recipe', auth, routeAdapter(makeLoadRecipesController()))
}
