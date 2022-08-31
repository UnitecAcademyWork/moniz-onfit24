import { LoadWeekController } from './load-week-controller'
import { HttpRequest, LoadWeekById, WeekModel } from './load-week-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    weekId: 'any_id'
  }
})

const makeFakeWeek = (): WeekModel => ({
  id: 'any_id',
  programId: 'program_id',
  goals: ['any_goal', 'other_goal'],
  exercises: [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
})

const makeLoadWeekById = (): LoadWeekById => {
  class LoadWeekByIdStub implements LoadWeekById {
    async loadById (weekId: string): Promise<WeekModel> {
      return Promise.resolve(makeFakeWeek())
    }
  }
  return new LoadWeekByIdStub()
}

interface SutTypes {
  loadWeekByIdStub: LoadWeekById
  sut: LoadWeekController
}

const makeSut = (): SutTypes => {
  const loadWeekByIdStub = makeLoadWeekById()
  const sut = new LoadWeekController(loadWeekByIdStub)
  return { sut, loadWeekByIdStub }
}

describe('LoadWeek Controller', () => {
  test('should call LoadWeekById with correct value', async () => {
    const { sut, loadWeekByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadWeekByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
