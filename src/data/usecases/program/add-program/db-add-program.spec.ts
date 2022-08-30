import { DbAddProgram } from './db-add-program'
import { AddProgramModel, AddProgramRepository, ProgramModel } from './db-add-program.protocols'

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  name: 'any_name',
  url: 'any_url',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
})

const makeFakeProgramData = (): AddProgramModel => ({
  name: 'any_name',
  url: 'any_url',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
})

const makeAddProgramRepository = (): AddProgramRepository => {
  class AddProgramRepositoryStub implements AddProgramRepository {
    async add (programData: AddProgramModel): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new AddProgramRepositoryStub()
}

interface SutTypes {
  addProgramRepositoryStub: AddProgramRepository
  sut: DbAddProgram
}

const makeSut = (): SutTypes => {
  const addProgramRepositoryStub = makeAddProgramRepository()
  const sut = new DbAddProgram(addProgramRepositoryStub)

  return { sut, addProgramRepositoryStub }
}

describe('DbAddProgram', () => {
  test('should call addProgramRepository with correct values', async () => {
    const { sut, addProgramRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addProgramRepositoryStub, 'add')
    await sut.add(makeFakeProgramData(), 'any_id')
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      url: 'any_url',
      description: 'any_description',
      difficulty: 'any_difficulty',
      duration: 'any_duration',
      objective: ['any_objective', 'other_objective'],
      equipment: ['any_equipment', 'other_equipment']
    }, 'any_id')
  })

  test('should return a program on success', async () => {
    const { sut } = makeSut()
    const program = await sut.add(makeFakeProgramData(), 'any_id')
    expect(program).toEqual(makeFakeProgram())
  })
})
