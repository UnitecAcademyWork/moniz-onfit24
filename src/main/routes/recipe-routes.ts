import { Router } from 'express'
import { routeAdapter } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeAddRecipeController } from '../factories/controllers/recipe/add-recipe/add-recipe-controller-factory'
import { auth } from '../middlewares/auth'
import { makeLoadRecipesController } from '../factories/controllers/recipe/load-all-recipes/load-all-recipes-controller-factory'
import { makeLoadRecipeController } from '../factories/controllers/recipe/load-recipe/load-recipe-controller-factory'
import { makeDeleteRecipeController } from '../factories/controllers/recipe/delete-recipe/delete-recipe-controller-factory'
import { makeUpdateRecipeController } from '../factories/controllers/recipe/update-recipe/update-recipe-controller-factory'

export default (router: Router): void => {
  router.post('/recipe', adminAuth, routeAdapter(makeAddRecipeController()))
  router.get('/recipe', auth, routeAdapter(makeLoadRecipesController()))
  router.get('/recipe/:recipeId', auth, routeAdapter(makeLoadRecipeController()))
  router.delete('/recipe/:recipeId', adminAuth, routeAdapter(makeDeleteRecipeController()))
  router.put('/recipe/:recipeId', adminAuth, routeAdapter(makeUpdateRecipeController()))
}
