import { DbAddWeek } from './db-add-week'
import { AddWeekModel, AddWeekRepository, WeekModel } from './db-add-week.protocols'

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

const makeFakeWeekData = (): AddWeekModel => ({
  programId: 'program_id',
  goals: ['any_goal', 'other_goal'],
  exercises: [{
    duration: 'any_duration',
    title: 'any_title',
    uri: 'any_uri',
    url: 'any_url'
  }]
})

const makeAddWeekRepository = (): AddWeekRepository => {
  class AddWeekRepositoryStub implements AddWeekRepository {
    async add (week: AddWeekModel): Promise<WeekModel> {
      return Promise.resolve(makeFakeWeek())
    }
  }

  return new AddWeekRepositoryStub()
}

interface SutTypes {
  addWeekRepositoryStub: AddWeekRepository
  sut: DbAddWeek
}

const makeSut = (): SutTypes => {
  const addWeekRepositoryStub = makeAddWeekRepository()
  const sut = new DbAddWeek(addWeekRepositoryStub)

  return { sut, addWeekRepositoryStub }
}

describe('DbAddWeek', () => {
  test('should call addWeekRepository with correct values', async () => {
    const { sut, addWeekRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addWeekRepositoryStub, 'add')
    await sut.add(makeFakeWeekData(), 'any_id')
    expect(addSpy).toHaveBeenCalledWith({
      programId: 'program_id',
      goals: ['any_goal', 'other_goal'],
      exercises: [{
        duration: 'any_duration',
        title: 'any_title',
        uri: 'any_uri',
        url: 'any_url'
      }]
    }, 'any_id')
  })

  test('should return a training week on success', async () => {
    const { sut } = makeSut()
    const week = await sut.add(makeFakeWeekData(), 'any_id')
    expect(week).toEqual(makeFakeWeek())
  })

  test('should return throw if AddWeekRepository throws', async () => {
    const { sut, addWeekRepositoryStub } = makeSut()
    jest.spyOn(addWeekRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeWeekData(), 'any_id')
    await expect(promise).rejects.toThrow()
  })
})
