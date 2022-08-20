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

  test('should return an objective on add success', async () => {
    const sut = makeSut()
    const objective = await sut.add({ name: 'valid_name', icon: 'valid_icon', description: 'valid_description' })
    expect(objective).toBeTruthy()
    expect(objective.id).toBeTruthy()
    expect(objective.name).toBe('valid_name')
    expect(objective.icon).toBe('valid_icon')
    expect(objective.description).toBe('valid_description')
  })

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
})
