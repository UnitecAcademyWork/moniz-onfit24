import { ObjectiveModel } from '../add-objective/db-add-objectve.protocols'
import { DbLoadObjectives } from './db-load-objectives'
import { LoadObjectivesRepository } from './db-load-objectives.protocols'

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

const makeLoadObjectivesRepository = (): LoadObjectivesRepository => {
  class LoadObjectivesRepositoryStub implements LoadObjectivesRepository {
    async loadAll (): Promise<ObjectiveModel[]> {
      return Promise.resolve(makeFakeObjective())
    }
  }
  return new LoadObjectivesRepositoryStub()
}

interface sutTypes {
  loadObjectivesRepositoryStub: LoadObjectivesRepository
  sut: DbLoadObjectives
}

const makeSut = (): sutTypes => {
  const loadObjectivesRepositoryStub = makeLoadObjectivesRepository()
  const sut = new DbLoadObjectives(loadObjectivesRepositoryStub)

  return { sut, loadObjectivesRepositoryStub }
}

describe('DbLoadObjectives', () => {
  test('should call LoadObjectivesRepository', async () => {
    const { sut, loadObjectivesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadObjectivesRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
