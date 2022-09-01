import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { Account } from '@/infra/db/entities/account'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { WeekModel } from '@/domain/models/week'
import { Week } from '@/infra/db/entities/week'

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

const makeWeek = async (): Promise<WeekModel> => {
  const week = new Week()
  week.goals = ['any_goal']
  week.exercises = [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
  await Week.save(week)
  return week
}

describe('Week Routes', () => {
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
      await request(app)
        .post('/api/week')
        .set('x-access-token', accessToken)
        .send({
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

    test('should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/api/program')
        .send({
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

  describe('PUT /week', () => {
    test('should return 200 on update week', async () => {
      const accessToken = await makeAccessToken()
      const week = await makeWeek()
      await request(app)
        .put(`/api/week/${week.id}`)
        .set('x-access-token', accessToken)
        .send({
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
  })

  describe('get /week/weekId', () => {
    test('should return 403 if no access token is provided', async () => {
      const week = await makeWeek()
      await request(app)
        .get(`/api/week/${week.id}`)
        .expect(403)
    })

    test('should return 403 if no week is found', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/week/wrong_id')
        .set('x-access-token', accessToken)
        .expect(403)
    })

    test('should return 200 if a week is found', async () => {
      const accessToken = await makeAccessToken()
      const week = await makeWeek()
      await request(app)
        .get(`/api/week/${week.id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('get /weeks', () => {
    test('should return 403 on add weeks without accessToken', async () => {
      await request(app)
        .get('/api/week')
        .expect(403)
    })

    test('should return 200 on load weeks with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await makeWeek()
      await request(app)
        .get('/api/week')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('should return 204 if list is empty', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/week')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
