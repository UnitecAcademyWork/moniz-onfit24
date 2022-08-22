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
  })
})
