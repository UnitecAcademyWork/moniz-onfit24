import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/typeorm-helper'

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

  describe('POST /account-info', () => {
    test('should return 403 on add account info without accessToken', async () => {
      await request(app)
        .post('/api/account-info')
        .send({
          birth: '20/10/2020',
          gender: 'masculino',
          height: '1.74',
          objective: 'ficar forte',
          weight: '60.8'
        })
        .expect(403)
    })
  })
})
