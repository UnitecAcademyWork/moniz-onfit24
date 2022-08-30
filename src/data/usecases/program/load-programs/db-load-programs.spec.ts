import { DbLoadPrograms } from './db-load-programs'
import { LoadProgramsRepository, ProgramModel } from './db-load-programs.protocols'

const makeFakeProgram = (): ProgramModel[] => ([{
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
}, {
  id: 'other_id',
  name: 'other_name',
  description: 'other_description',
  difficulty: 'other_difficulty',
  duration: 'other_duration',
  objective: ['other_objective', 'other_objective'],
  equipment: ['other_equipment', 'other_equipment']
}])

const makeLoadProgramsRepository = (): LoadProgramsRepository => {
  class LoadProgramsRepositoryStub implements LoadProgramsRepository {
    async load (): Promise<ProgramModel[]> {
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
    const loadSpy = jest.spyOn(loadProgramsRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return a program on success', async () => {
    const { sut } = makeSut()
    const program = await sut.load()
    expect(program).toEqual(makeFakeProgram())
  })

  test('should throw if LoadProgramsRepository throws', async () => {
    const { sut, loadProgramsRepositoryStub } = makeSut()
    jest.spyOn(loadProgramsRepositoryStub, 'load').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})