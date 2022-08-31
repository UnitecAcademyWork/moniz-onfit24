import { AddProgramModel } from '@/domain/usecases/program/add-program'
import { AddWeekModel } from '@/domain/usecases/week/add-week'
import { ProgramRepository } from '../program/program-repository'
import { TypeormHelper } from '../typeorm-helper'
import { WeekRepository } from './week-repository'

const makeFakeWeekData = async (): Promise<AddWeekModel> => ({
  programId: await makeProgramId(),
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

const makeProgramData = (): AddProgramModel => ({
  name: 'any_name',
  url: 'any_url',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  equipment: ['any_equipment', 'other_equipment'],
  objective: ['any_objective', 'other_objective']
})

const makeProgramId = async (): Promise<string> => {
  const programId = await (await new ProgramRepository().add(makeProgramData())).id
  return programId
}

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

    test('should null if no program is found', async () => {
      const sut = makeSut()
      const weekData = await makeFakeWeekData()
      weekData.programId = 'wrong_id'
      const week = await sut.add(weekData)
      expect(week).toBeNull()
    })
  })
})
