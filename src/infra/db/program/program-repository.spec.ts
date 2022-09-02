import { AddWeekRepository } from '@/data/protocols/db/week/add-week-repository'
import { WeekModel } from '@/domain/models/week'
import { AddProgramModel } from '@/domain/usecases/program/add-program'
import { AddWeekModel } from '@/domain/usecases/week/add-week'
import { Week } from '../entities/week'
import { TypeormHelper } from '../typeorm-helper'
import { ProgramRepository } from './program-repository'

describe('Program Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  const makeProgram = (): AddProgramModel => ({
    name: 'any_name',
    url: 'any_url',
    description: 'any_description',
    difficulty: 'any_difficulty',
    duration: 'any_duration',
    equipment: ['any_equipment', 'other_equipment'],
    objective: ['any_objective', 'other_objective']
  })

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

  const makeAddWeek = (): AddWeekRepository => {
    class AddWeekRepositoryStub implements AddWeekRepository {
      async add (weekData: AddWeekModel): Promise<WeekModel> {
        const week = new Week()
        week.goals = weekData.goals
        week.exercises = weekData.exercises
        await Week.save(week)
        return week
      }
    }
    return new AddWeekRepositoryStub()
  }

  const makeSut = (): ProgramRepository => {
    return new ProgramRepository()
  }

  describe('add()', () => {
    test('should return a program on add success', async () => {
      const sut = makeSut()
      const program = await sut.add(makeProgram(), 'any_id')
      expect(program).toBeTruthy()
      expect(program.id).toBeTruthy()
      expect(program.name).toBe('any_name')
      expect(program.description).toBe('any_description')
      expect(program.difficulty).toBe('any_difficulty')
      expect(program.duration).toBe('any_duration')
      expect(program.equipment).toEqual(['any_equipment', 'other_equipment'])
      expect(program.objective).toEqual(['any_objective', 'other_objective'])
    })
  })

  describe('loadById()', () => {
    test('should return a program on loadById success', async () => {
      const sut = makeSut()
      const program = await sut.add(makeProgram(), 'any_id')
      const loadedProgram = await sut.loadById(program.id)
      expect(loadedProgram).toBeTruthy()
      expect(loadedProgram.id).toBeTruthy()
      expect(loadedProgram.name).toBe('any_name')
      expect(loadedProgram.description).toBe('any_description')
      expect(loadedProgram.difficulty).toBe('any_difficulty')
      expect(loadedProgram.duration).toBe('any_duration')
      expect(loadedProgram.equipment).toEqual(['any_equipment', 'other_equipment'])
      expect(loadedProgram.objective).toEqual(['any_objective', 'other_objective'])
    })

    test('should return null if no program is found', async () => {
      const sut = makeSut()
      const loadedProgram = await sut.loadById('invalid_id')
      expect(loadedProgram).toBeNull()
    })
  })

  describe('loadAll()', () => {
    test('should load all programs on success', async () => {
      const sut = makeSut()
      await sut.add(makeProgram(), 'any_id')
      await sut.add(makeProgram(), 'other_id')
      const objectives = await sut.loadAll()
      expect(objectives.length).toBe(2)
      expect(objectives[0].name).toBe('any_name')
      expect(objectives[1].name).toBe('any_name')
    })

    test('should load empty list', async () => {
      const sut = makeSut()
      const objectives = await sut.loadAll()
      expect(objectives.length).toBe(0)
    })
  })

  describe('delete()', () => {
    test('should delete program on success', async () => {
      const sut = makeSut()
      await sut.add(makeProgram(), 'any_id')
      const objectives = await sut.delete('any_id')
      expect(objectives).toBeTruthy()
    })

    test('should return null if no program is found', async () => {
      const sut = makeSut()
      const objectives = await sut.delete('any_id')
      expect(objectives).toBeNull()
    })
  })

  describe('associateToWeek()', () => {
    test('should associate week to program on success', async () => {
      const sut = makeSut()
      const program = await sut.add(makeProgram(), 'any_id')
      const week = await makeAddWeek().add(await makeFakeWeekData())
      const week2 = await makeAddWeek().add(await makeFakeWeekData())
      await sut.associateToWeek(program.id, week.id)
      const result = await sut.associateToWeek(program.id, week2.id)
      expect(result.weeks.length).toBe(2)
    })

    test('should return if null program Id is invalid', async () => {
      const sut = makeSut()
      const week = await makeAddWeek().add(await makeFakeWeekData())
      const result = await sut.associateToWeek('wrong_id', week.id)
      expect(result).toBeNull()
    })

    test('should associate week to program', async () => {
      const sut = makeSut()
      const program = await sut.add(makeProgram(), 'any_id')
      const result = await sut.associateToWeek(program.id, 'wrong_id')
      expect(result).toBeNull()
    })
  })
})
