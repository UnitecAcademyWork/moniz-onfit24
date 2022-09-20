import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { Account } from '@/infra/db/entities/account'

const makeAccount = async (): Promise<any> => {
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
  const accountId = newAccount.id
  return { accessToken, accountId }
}

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

  describe('POST /account-details', () => {
    test('should return 403 on add account details without accessToken', async () => {
      const { accountId } = await makeAccount()
      await request(app)
        .post('/api/account-details')
        .send({
          accountId,
          birth: '20/10/2020',
          gender: 'masculino',
          height: '1.74',
          objective: 'ficar forte',
          weight: '60.8'
        })
        .expect(403)
    })

    test('should return 200 on add account details success', async () => {
      const { accessToken, accountId } = await makeAccount()
      await request(app)
        .post('/api/account-details')
        .set('x-access-token', accessToken)
        .send({
          accountId,
          birth: '20/10/2020',
          gender: 'masculino',
          height: '1.74',
          objective: 'ficar forte',
          weight: '60.8'
        })
        .expect(200)
    })
  })
})
