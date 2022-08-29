import { DbLoadProgramById } from './db-load-program-by-id'
import { LoadProgramByIdRepository, ProgramModel } from './db-load-program-by-id.protocols'

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
})

const makeLoadProgramByIdRepository = (): LoadProgramByIdRepository => {
  class LoadProgramByIdRepositoryStub implements LoadProgramByIdRepository {
    async loadById (programId: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new LoadProgramByIdRepositoryStub()
}

interface SutTypes {
  loadProgramByIdRepositoryStub: LoadProgramByIdRepository
  sut: DbLoadProgramById
}

const makeSut = (): SutTypes => {
  const loadProgramByIdRepositoryStub = makeLoadProgramByIdRepository()
  const sut = new DbLoadProgramById(loadProgramByIdRepositoryStub)

  return { sut, loadProgramByIdRepositoryStub }
}

describe('LoadProgramById', () => {
  test('should call LoadProgramByIdRepository with correct values', async () => {
    const { sut, loadProgramByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadProgramByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return a program on success', async () => {
    const { sut } = makeSut()
    const program = await sut.loadById('any_id')
    expect(program).toEqual(makeFakeProgram())
  })

  test('should throw if LoadProgramByIdRepository throws', async () => {
    const { sut, loadProgramByIdRepositoryStub } = makeSut()
    jest.spyOn(loadProgramByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
