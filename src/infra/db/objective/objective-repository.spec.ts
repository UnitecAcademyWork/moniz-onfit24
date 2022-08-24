import { TypeormHelper } from '../typeorm-helper'
import { ObjectiveRepository } from './objective-repository'

const makeSut = (): ObjectiveRepository => {
  return new ObjectiveRepository()
}

describe('Objective Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.create()
  })
  afterAll(async () => {
    await TypeormHelper.close()
  })
  beforeEach(async () => {
    await TypeormHelper.clear()
  })

  describe('add()', () => {
    test('should return an objective on add success', async () => {
      const sut = makeSut()
      const objective = await sut.add({ name: 'valid_name', icon: 'valid_icon', description: 'valid_description' })
      expect(objective).toBeTruthy()
      expect(objective.id).toBeTruthy()
      expect(objective.name).toBe('valid_name')
      expect(objective.icon).toBe('valid_icon')
      expect(objective.description).toBe('valid_description')
    })
  })

  describe('loadByName()', () => {
    test('should return an objective on loadByName success', async () => {
      const sut = makeSut()
      await sut.add({ name: 'valid_name', icon: 'valid_icon', description: 'valid_description' })
      const objective = await sut.loadByName('valid_name')
      expect(objective).toBeTruthy()
      expect(objective.id).toBeTruthy()
      expect(objective.name).toBe('valid_name')
      expect(objective.icon).toBe('valid_icon')
      expect(objective.description).toBe('valid_description')
    })

    test('should return null if loadByName fails', async () => {
      const sut = makeSut()
      const objective = await sut.loadByName('valid_name')
      expect(objective).toBeFalsy()
    })
  })

  describe('loadAll()', () => {
    test('should load all objectives on success', async () => {
      const sut = makeSut()
      await sut.add({ name: 'valid_name', icon: 'valid_icon', description: 'valid_description' })
      await sut.add({ name: 'other_name', icon: 'other_icon', description: 'other_description' })
      const objectives = await sut.loadAll()
      expect(objectives.length).toBe(2)
      expect(objectives[0].name).toBe('valid_name')
      expect(objectives[1].name).toBe('other_name')
    })

    test('should load empty list', async () => {
      const sut = makeSut()
      const objectives = await sut.loadAll()
      expect(objectives.length).toBe(0)
    })
  })
})
