import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { Account } from '@/infra/db/entities/account'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

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

  describe('POST /account-info', () => {
    test('should return 403 on add account info without accessToken', async () => {
      const { accountId } = await makeAccount()
      await request(app)
        .post('/api/account-info')
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

    test('should return 200 on add account info success', async () => {
      const { accessToken, accountId } = await makeAccount()
      await request(app)
        .post('/api/account-info')
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
