import { DbAddObjective } from './db-add-objective'
import { AddObjectiveModel, AddObjectiveRepository, ObjectiveModel } from './db-add-objectve.protocols'

const makeFakeObjective = (): ObjectiveModel => ({
  id: 'valid_id',
  name: 'valid_name',
  description: 'valid_description',
  icon: 'valid_icon'
})

const makeFakeObjectiveData = (): AddObjectiveModel => ({
  name: 'valid_name',
  description: 'valid_description',
  icon: 'valid_icon'
})

const makeAddObjectiveRepository = (): AddObjectiveRepository => {
  class AddObjectiveRepositoryStub implements AddObjectiveRepository {
    async add (objectiveData: AddObjectiveModel): Promise<ObjectiveModel> {
      return await Promise.resolve(makeFakeObjective())
    }
  }
  return new AddObjectiveRepositoryStub()
}

interface sutTypes {
  sut: DbAddObjective
  addObjectiveRepositoryStub: AddObjectiveRepository
}

const makeSut = (): sutTypes => {
  const addObjectiveRepositoryStub = makeAddObjectiveRepository()
  const sut = new DbAddObjective(addObjectiveRepositoryStub)
  return { sut, addObjectiveRepositoryStub }
}

describe('DbAddObjective', () => {
  test('should call addObjectiveRepository with correct values', async () => {
    const { sut, addObjectiveRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addObjectiveRepositoryStub, 'add')
    await sut.add(makeFakeObjectiveData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      icon: 'valid_icon',
      description: 'valid_description'
    })
  })

  test('should return an objective on success', async () => {
    const { sut } = makeSut()
    const objective = await sut.add(makeFakeObjectiveData())
    expect(objective).toEqual(makeFakeObjective())
  })
})
