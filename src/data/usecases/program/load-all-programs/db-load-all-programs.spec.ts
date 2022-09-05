import { DbLoadPrograms } from './db-load-all-programs'
import { LoadProgramsRepository, ProgramModel } from './db-load-all-programs.protocols'

const makeFakeProgram = (): ProgramModel[] => ([{
  id: 'any_id',
  name: 'any_name',
  url: 'any_url',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
}, {
  id: 'other_id',
  name: 'other_name',
  url: 'any_url',
  description: 'other_description',
  difficulty: 'other_difficulty',
  duration: 'other_duration',
  objective: ['other_objective', 'other_objective'],
  equipment: ['other_equipment', 'other_equipment']
}])

const makeLoadProgramsRepository = (): LoadProgramsRepository => {
  class LoadProgramsRepositoryStub implements LoadProgramsRepository {
    async loadAll (): Promise<ProgramModel[]> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new LoadProgramsRepositoryStub()
}

interface SutTypes {
  loadProgramsRepositoryStub: LoadProgramsRepository
  sut: DbLoadPrograms
}

const makeSut = (): SutTypes => {
  const loadProgramsRepositoryStub = makeLoadProgramsRepository()
  const sut = new DbLoadPrograms(loadProgramsRepositoryStub)

  return { sut, loadProgramsRepositoryStub }
}

describe('LoadProgramById', () => {
  test('should call LoadProgramsRepository', async () => {
    const { sut, loadProgramsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadProgramsRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return a program on success', async () => {
    const { sut } = makeSut()
    const program = await sut.loadAll()
    expect(program).toEqual(makeFakeProgram())
  })

  test('should throw if LoadProgramsRepository throws', async () => {
    const { sut, loadProgramsRepositoryStub } = makeSut()
    jest.spyOn(loadProgramsRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})
