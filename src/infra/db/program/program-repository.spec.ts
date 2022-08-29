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

  const makeSut = (): ProgramRepository => {
    return new ProgramRepository()
  }

  describe('add()', () => {
    test('should return a program on add success', async () => {
      const sut = makeSut()
      const program = await sut.add({
        name: 'any_name',
        description: 'any_description',
        difficulty: 'any_difficulty',
        duration: 'any_duration',
        equipment: ['any_equipment', 'other_equipment'],
        objective: ['any_objective', 'other_objective']
      })
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
})
