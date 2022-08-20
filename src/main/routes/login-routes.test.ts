import request from 'supertest'
import { hash } from 'bcrypt'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { Account } from '@/infra/db/entities/account'

describe('Login Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'lambo',
          email: 'lambo@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123456', 12)
      const account = new Account()
      account.name = 'lambo'
      account.email = 'lambo@gmail.com'
      account.password = password
      await account.save()
      await request(app)
        .post('/api/login')
        .send({
          email: 'lambo@gmail.com',
          password: '123456'
        })
        .expect(200)
    })
  })

  test('should return 401 on login', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'lambo@gmail.com',
        password: '123456'
      })
      .expect(401)
  })
})
