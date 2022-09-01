import { DbLoadWeeks } from './db-load-weeks'
import { LoadWeeksRepository, WeekModel } from './db-load-weeks.protocols'

const makeFakeWeeks = (): WeekModel[] => ([{
  id: 'any_id',
  goals: ['any_goal', 'other_goal'],
  exercises: [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
},
{
  id: 'other_id',
  goals: ['other_goal', 'other_goal'],
  exercises: [{
    duration: 'other_duration',
    title: 'other_title',
    uri: 'other_uri',
    url: 'other_url'
  }]
}])

const makeLoadWeeksRepository = (): LoadWeeksRepository => {
  class LoadWeeksRepositoryStub implements LoadWeeksRepository {
    async loadAll (): Promise<WeekModel[]> {
      return Promise.resolve(makeFakeWeeks())
    }
  }
  return new LoadWeeksRepositoryStub()
}

interface SutTypes {
  loadWeeksRepositoryStub: LoadWeeksRepository
  sut: DbLoadWeeks
}

const makeSut = (): SutTypes => {
  const loadWeeksRepositoryStub = makeLoadWeeksRepository()
  const sut = new DbLoadWeeks(loadWeeksRepositoryStub)
  return { sut, loadWeeksRepositoryStub }
}

describe('DbLoadWeeks', () => {
  test('should call LoadWeeksRepository ', async () => {
    const { sut, loadWeeksRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadWeeksRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
