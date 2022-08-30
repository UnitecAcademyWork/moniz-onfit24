import { DbDeleteProgram } from './db-delete-program'
import { DeleteProgramRepository, ProgramModel } from './db-delete-program.protocols'

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment']
})

const makeDeleteProgramRepository = (): DeleteProgramRepository => {
  class DeleteProgramRepositoryStub implements DeleteProgramRepository {
    async delete (programId: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new DeleteProgramRepositoryStub()
}

interface SutTypes {
  deleteProgramRepositoryStub: DeleteProgramRepository
  sut: DbDeleteProgram
}

const makeSut = (): SutTypes => {
  const deleteProgramRepositoryStub = makeDeleteProgramRepository()
  const sut = new DbDeleteProgram(deleteProgramRepositoryStub)

  return { sut, deleteProgramRepositoryStub }
}

describe('DbDeleteProgram', () => {
  test('should call DeleteProgramRepository with correct value', async () => {
    const { sut, deleteProgramRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteProgramRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })
})
