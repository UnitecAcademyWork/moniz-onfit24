import request from 'supertest'
import app from '../config/app'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/entities/account'
import { Objective } from '@/infra/db/entities/objective'

describe('Objective Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

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

  describe('POST /objective', () => {
    test('should return 403 on add objective without accessToken', async () => {
      await request(app)
        .post('/api/objective')
        .send({
          name: 'name',
          icon: 'icon',
          description: 'description'
        })
        .expect(403)
    })

    test('should return 200 on add objective with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/objective')
        .set('x-access-token', accessToken)
        .send({
          name: 'name',
          icon: 'icon',
          description: 'description'
        })
        .expect(200)
    })
  })

  describe('get /objective', () => {
    test('should return 403 on add objective without accessToken', async () => {
      await request(app)
        .get('/api/objective')
        .expect(403)
    })

    test('should return 200 on load objectives with valid accessToken', async () => {
      const accessToken = await makeAccessToken()

      const objective = new Objective()
      objective.name = 'name'
      objective.icon = 'icon'
      objective.description = 'description'
      await Objective.save(objective)
      await request(app)
        .get('/api/objective')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('should return 200 on load objectives with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/objective')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
