import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { Account } from '@/infra/db/entities/account'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { Recipe } from '@/infra/db/entities/recipe'

const makeAccessToken = async (): Promise<string> => {
  const password = await hash('123456', 12)
  const account = new Account()
  account.name = 'lambo'
  account.email = 'lambo@gmail.com'
  account.password = password
  const newAccount = await account.save()
  const accessToken = sign({ id: newAccount.id }, env.jwtsecret)
  const updatedAccount = await Account.findOneBy({ id: newAccount.id })
  updatedAccount.accessToken = accessToken
  updatedAccount.role = 'admin'
  await Account.save(updatedAccount)
  return accessToken
}

const makeRecipe = async (): Promise<Recipe> => {
  const recipe = new Recipe()
  recipe.cookTime = 'any_time'
  recipe.description = 'any_description'
  recipe.difficulty = 'any_difficulty'
  recipe.ingredients = [{ name: 'any_ingredient_name', quantity: 'any_quantity' }]
  recipe.name = 'any_name'
  recipe.nutrition = { carbs: 'any_carbs', fat: 'any_fat', fibre: 'any_fibre', kcal: 'any_kcal', protein: 'any_protein', salt: 'any_salt', saturates: 'any_saturate', sugar: 'any_sugar' }
  recipe.prepTime = 'any_time'
  recipe.serves = 'any_serving'
  recipe.steps = ['first_step', 'second_step']
  recipe.tags = ['any_tag', 'other_tag']
  recipe.url = 'any_url'
  return await recipe.save()
}

describe('Recipe Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  describe('POST /recipe', () => {
    test('should return 200 on add recipe', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/recipe')
        .set('x-access-token', accessToken)
        .send({
          cookTime: 'any_time',
          description: 'any_description',
          difficulty: 'any_difficulty',
          ingredients: [{ name: 'any_ingredient_name', quantity: 'any_quantity' }],
          name: 'any_name',
          nutrition: { carbs: 'any_carbs', fat: 'any_fat', fibre: 'any_fibre', kcal: 'any_kcal', protein: 'any_protein', salt: 'any_salt', saturates: 'any_saturate', sugar: 'any_sugar' },
          prepTime: 'any_time',
          serves: 'any_serving',
          steps: ['first_step', 'second_step'],
          tags: ['any_tag', 'other_tag'],
          url: 'any_url'
        })
        .expect(200)
    })

    test('should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/api/recipe')
        .send({
          cookTime: 'any_time',
          description: 'any_description',
          difficulty: 'any_difficulty',
          ingredients: [{ name: 'any_ingredient_name', quantity: 'any_quantity' }],
          name: 'any_name',
          nutrition: { carbs: 'any_carbs', fat: 'any_fat', fibre: 'any_fibre', kcal: 'any_kcal', protein: 'any_protein', salt: 'any_salt', saturates: 'any_saturate', sugar: 'any_sugar' },
          prepTime: 'any_time',
          serves: 'any_serving',
          steps: ['first_step', 'second_step'],
          tags: ['any_tag', 'other_tag'],
          url: 'any_url'
        })
        .expect(403)
    })
  })

  describe('get /recipe', () => {
    test('should return 403 on load recipe without accessToken', async () => {
      await request(app)
        .get('/api/recipe')
        .expect(403)
    })

    test('should return 200 on load objectives with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await makeRecipe()
      await makeRecipe()
      await request(app)
        .get('/api/recipe')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('should return 204 on if list is empty', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/recipe')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('get /recipe/recipeId', () => {
    test('should return 403 if no access token is provided', async () => {
      const recipe = await makeRecipe()
      await request(app)
        .get(`/api/recipe/${recipe.id}`)
        .expect(403)
    })

    test('should return 200 if a recipe is found', async () => {
      const accessToken = await makeAccessToken()
      const recipe = await makeRecipe()
      await request(app)
        .get(`/api/recipe/${recipe.id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('delete /recipe/:recipeId', () => {
    test('should return 403 on delete recipe without accessToken', async () => {
      const recipe = await makeRecipe()
      await request(app)
        .delete(`/api/recipe/${recipe.id}`)
        .expect(403)
    })

    test('should return 204 on delete recipe with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const recipe = await makeRecipe()
      await request(app)
        .delete(`/api/recipe/${recipe.id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('should return 403 on if no recipe is found', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .delete('/api/recipe/wrong_id')
        .set('x-access-token', accessToken)
        .expect(403)
    })
  })
})
