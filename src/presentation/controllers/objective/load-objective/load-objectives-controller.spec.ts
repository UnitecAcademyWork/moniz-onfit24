import { ok } from '@/presentation/helpers/http/http-helper'
import { LoadObjectivesController } from './load-objectives-controller'
import { LoadObjectives, ObjectiveModel } from './load-objectives-controller.protocol'

const makeFakeObjective = (): ObjectiveModel[] => {
  return [{
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    icon: 'any_icon'
  },
  {
    id: 'other_id',
    name: 'other_name',
    description: 'other_description',
    icon: 'other_icon'
  }]
}

const makeLoadObjectives = (): LoadObjectives => {
  class LoadObjectivesStub implements LoadObjectives {
    async load (): Promise<ObjectiveModel[]> {
      return Promise.resolve(makeFakeObjective())
    }
  }
  return new LoadObjectivesStub()
}

interface sutTypes {
  loadObjectivesStub: LoadObjectives
  sut: LoadObjectivesController
}

const makeSut = (): sutTypes => {
  const loadObjectivesStub = makeLoadObjectives()
  const sut = new LoadObjectivesController(loadObjectivesStub)
  return { sut, loadObjectivesStub }
}

describe('LoadObjective Controller', () => {
  test('should call LoadObjectives', async () => {
    const { sut, loadObjectivesStub } = makeSut()
    const loadSpy = jest.spyOn(loadObjectivesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeObjective()))
  })
})
