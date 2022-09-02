import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import { Account } from '@/infra/db/entities/account'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { ProgramModel } from '@/domain/models/program'
import { Program } from '@/infra/db/entities/program'
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

  describe('POST /program', () => {
    test('should return 200 on add program', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/program')
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          url: 'any_url',
          description: 'any_description',
          difficulty: 'any_difficulty',
          duration: 'any_duration',
          objective: ['any_objective', 'other_objective'],
          equipment: ['any_equipment', 'other_equipment']
        })
        .expect(200)
    })

    test('should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/api/program')
        .send({
          name: 'any_name',
          description: 'any_description',
          difficulty: 'any_difficulty',
          duration: 'any_duration',
          objective: ['any_objective', 'other_objective'],
          equipment: ['any_equipment', 'other_equipment']
        })
        .expect(403)
    })
  })

  describe('get /program/programId', () => {
    test('should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/api/program')
        .send({
          name: 'any_name',
          description: 'any_description',
          difficulty: 'any_difficulty',
          duration: 'any_duration',
          objective: ['any_objective', 'other_objective'],
          equipment: ['any_equipment', 'other_equipment']
        })
        .expect(403)
    })

    test('should return 200 if a program is found', async () => {
      const accessToken = await makeAccessToken()
      const program = await makeProgram()
      await request(app)
        .get(`/api/program/${program.id}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          description: 'any_description',
          difficulty: 'any_difficulty',
          duration: 'any_duration',
          objective: ['any_objective', 'other_objective'],
          equipment: ['any_equipment', 'other_equipment']
        })
        .expect(200)
    })
  })

  describe('get /program', () => {
    test('should return 403 on load program without accessToken', async () => {
      await request(app)
        .get('/api/program')
        .expect(403)
    })

    test('should return 200 on load objectives with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await makeProgram()
      await makeProgram()
      await request(app)
        .get('/api/program')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('should return 204 on if list is empty', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/program')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('delete /program/:programId', () => {
    test('should return 403 on delete program without accessToken', async () => {
      const program = await makeProgram()
      await request(app)
        .delete(`/api/program/${program.id}`)
        .expect(403)
    })

    test('should return 204 on delete program with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const program = await makeProgram()
      await request(app)
        .delete(`/api/program/${program.id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('should return 403 on if no program is found', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .delete('/api/program/wrong_id')
        .set('x-access-token', accessToken)
        .expect(403)
    })
  })

  describe('POST /program-week', () => {
    test('should return 200 on associate week to program', async () => {
      const program = await makeProgram()
      const week = await makeWeek()
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/program-week')
        .set('x-access-token', accessToken)
        .send({
          programId: program.id,
          weekId: week.id
        })
        .expect(200)
    })

    test('should return 403 if no access token is provided', async () => {
      const program = await makeProgram()
      const week = await makeWeek()
      await request(app)
        .post('/api/program-week')
        .send({
          programId: program.id,
          weekId: week.id
        })
        .expect(403)
    })

    test('should return 403 if if invalid Id is provided', async () => {
      await makeProgram()
      const week = await makeWeek()
      await request(app)
        .post('/api/program-week')
        .send({
          programId: 'wrong_id',
          weekId: week.id
        })
        .expect(403)
    })
  })
})
