import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { Account } from '@/infra/db/entities/account'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { ProgramModel } from '@/domain/models/program'
import { Program } from '@/infra/db/entities/program'

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

const makeProgram = async (): Promise<ProgramModel> => {
  const program = new Program()
  program.name = 'any_name'
  program.url = 'any_url'
  program.description = 'any_description'
  program.difficulty = 'any_difficulty'
  program.duration = 'any_duration'
  program.objective = ['any_objective', 'other_objective']
  program.equipment = ['any_equipment', 'other_equipment']
  return await program.save()
}

describe('Program Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  describe('POST /week', () => {
    test('should return 200 on add week', async () => {
      const accessToken = await makeAccessToken()
      const programId = await (await makeProgram()).id
      await request(app)
        .post('/api/week')
        .set('x-access-token', accessToken)
        .send({
          programId,
          goals: ['any_goal', 'other_goal'],
          exercises: [{
            title: 'any_title',
            url: 'any_url',
            duration: 'any_duration',
            uri: 'any_uri'
          }]
        })
        .expect(200)
    })

    test('should return 403 on add week', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/week')
        .set('x-access-token', accessToken)
        .send({
          programId: 'wrong_id',
          goals: ['any_goal', 'other_goal'],
          exercises: [{
            title: 'any_title',
            url: 'any_url',
            duration: 'any_duration',
            uri: 'any_uri'
          }]
        })
        .expect(403)
    })

    test('should return 403 if no access token is provided', async () => {
      const programId = await (await makeProgram()).id
      await request(app)
        .post('/api/program')
        .send({
          programId,
          goals: ['any_goal', 'other_goal'],
          exercises: [{
            title: 'any_title',
            url: 'any_url',
            duration: 'any_duration',
            uri: 'any_uri'
          }]
        })
        .expect(403)
    })
  })
})
