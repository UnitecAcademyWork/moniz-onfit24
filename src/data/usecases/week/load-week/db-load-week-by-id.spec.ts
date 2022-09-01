import { DbLoadWeekById } from './db-load-week-by-id'
import { LoadWeekByIdRepository, WeekModel } from './db-load-week-by-id.protocols'

const makeFakeWeek = (): WeekModel => ({
  id: 'any_id',
  goals: ['any_goal', 'other_goal'],
  exercises: [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
})

const makeLoadWeekByIdRepository = (): LoadWeekByIdRepository => {
  class LoadWeekByIdRepositoryStub implements LoadWeekByIdRepository {
    async loadById (weekId: string): Promise<WeekModel> {
      return Promise.resolve(makeFakeWeek())
    }
  }
  return new LoadWeekByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadWeekById
  loadWeekByIdRepositoryStub: LoadWeekByIdRepository
}

const makeSut = (): SutTypes => {
  const loadWeekByIdRepositoryStub = makeLoadWeekByIdRepository()
  const sut = new DbLoadWeekById(loadWeekByIdRepositoryStub)
  return { sut, loadWeekByIdRepositoryStub }
}

describe('DbLoadWeekById Usecase', () => {
  test('should call LoadWeekByIdRepository with correct value', async () => {
    const { sut, loadWeekByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadWeekByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return a week on success', async () => {
    const { sut } = makeSut()
    const week = await sut.loadById('any_id')
    expect(week).toEqual(makeFakeWeek())
  })

  test('should throw if LoadWeekByIdRepository throws', async () => {
    const { sut, loadWeekByIdRepositoryStub } = makeSut()
    jest.spyOn(loadWeekByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
