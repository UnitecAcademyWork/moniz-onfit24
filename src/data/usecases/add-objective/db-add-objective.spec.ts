import { DbAddObjective } from './db-add-objective'
import { AddObjectiveModel, AddObjectiveRepository, LoadObjectiveByIdRepository, ObjectiveModel } from './db-add-objectve.protocols'

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

const makeLoadObjectiveByIdRepository = (): LoadObjectiveByIdRepository => {
  class LoadObjectiveByIdRepositoryStub implements LoadObjectiveByIdRepository {
    async load (name: string): Promise<ObjectiveModel> {
      return Promise.resolve(null)
    }
  }
  return new LoadObjectiveByIdRepositoryStub()
}

interface sutTypes {
  sut: DbAddObjective
  addObjectiveRepositoryStub: AddObjectiveRepository
  loadObjectiveByIdRepositoryStub: LoadObjectiveByIdRepository
}

const makeSut = (): sutTypes => {
  const addObjectiveRepositoryStub = makeAddObjectiveRepository()
  const loadObjectiveByIdRepositoryStub = makeLoadObjectiveByIdRepository()
  const sut = new DbAddObjective(addObjectiveRepositoryStub, loadObjectiveByIdRepositoryStub)
  return { sut, addObjectiveRepositoryStub, loadObjectiveByIdRepositoryStub }
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

  test('should call LoadObjectiveByIdRepository with correct name', async () => {
    const { sut, loadObjectiveByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadObjectiveByIdRepositoryStub, 'load')
    await sut.add(makeFakeObjectiveData())
    expect(loadSpy).toHaveBeenCalledWith('valid_name')
  })

  test('should return null if LoadObjectiveByIdRepository not return null', async () => {
    const { sut, loadObjectiveByIdRepositoryStub } = makeSut()
    jest.spyOn(loadObjectiveByIdRepositoryStub, 'load').mockImplementationOnce(async () => Promise.resolve(makeFakeObjective()))
    const objective = await sut.add(makeFakeObjectiveData())
    expect(objective).toBeNull()
  })
})
