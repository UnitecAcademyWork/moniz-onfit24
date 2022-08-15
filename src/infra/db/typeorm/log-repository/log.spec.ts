import { LogError } from '../entities/log-error'
import { TypeormHelper } from '../typeorm-helper'
import { LogRepository } from './log'

describe('Log Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  test('should create an error log on success', async () => {
    const sut = new LogRepository()
    await sut.logError('any_error')
    const count = await LogError.count()
    expect(count).toBe(1)
  })
})
