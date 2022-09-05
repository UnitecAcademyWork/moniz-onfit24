import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { Account } from '@/infra/db/entities/account'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

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
})
