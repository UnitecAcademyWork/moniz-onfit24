import { AddWeekModel } from '@/domain/usecases/week/add-week'
import { TypeormHelper } from '../typeorm-helper'
import { WeekRepository } from './week-repository'

const makeFakeWeekData = async (): Promise<AddWeekModel> => ({
  goals: ['any_goal', 'other_goal'],
  exercises: [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  },
  {
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
})

describe('Week Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  const makeSut = (): WeekRepository => {
    return new WeekRepository()
  }

  describe('add()', () => {
    test('should return a training week on add success', async () => {
      const sut = makeSut()
      const week = await sut.add(await makeFakeWeekData())
      expect(week).toBeTruthy()
      expect(week.id).toBeTruthy()
    })

    test('should edit a training week if week Id is provided', async () => {
      const sut = makeSut()
      const week = await sut.add(await makeFakeWeekData())
      const weekData = await makeFakeWeekData()
      const otherWeek = await sut.add(weekData, week.id)
      expect(otherWeek).toEqual(week)
    })
  })

  describe('loadById()', () => {
    test('should return a week on loadById success', async () => {
      const sut = makeSut()
      const weekData = await sut.add(await makeFakeWeekData())
      const week = await sut.loadById(weekData.id)
      expect(week).toBeTruthy()
      expect(week.id).toBeTruthy()
      expect(week.goals).toEqual(['any_goal', 'other_goal'])
    })

    test('should return null if no week is found', async () => {
      const sut = makeSut()
      const week = await sut.loadById('invalid_id')
      expect(week).toBeNull()
    })
  })

  describe('loadAll()', () => {
    test('should load all objectives on success', async () => {
      const sut = makeSut()
      await sut.add(await makeFakeWeekData())
      await sut.add(await makeFakeWeekData())
      const weeks = await sut.loadAll()
      expect(weeks.length).toBe(2)
      expect(weeks[0].goals).toEqual(['any_goal', 'other_goal'])
      expect(weeks[1].goals).toEqual(['any_goal', 'other_goal'])
    })

    test('should load empty list', async () => {
      const sut = makeSut()
      const weeks = await sut.loadAll()
      expect(weeks.length).toBe(0)
    })
  })
})
