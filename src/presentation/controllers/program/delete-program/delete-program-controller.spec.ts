import { DeleteProgramController } from './delete-program-controller'
import { DeleteProgram, HttpRequest, ProgramModel } from './delete-program-controller.protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    programId: 'any_id'
  }
})

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective']
})

const makeDeleteProgram = (): DeleteProgram => {
  class DeleteProgramStub implements DeleteProgram {
    async delete (programId: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new DeleteProgramStub()
}

interface SutTypes {
  deleteProgramStub: DeleteProgram
  sut: DeleteProgramController
}

const makeSut = (): SutTypes => {
  const deleteProgramStub = makeDeleteProgram()
  const sut = new DeleteProgramController(deleteProgramStub)

  return { sut, deleteProgramStub }
}

describe('DeleteProgram Controller', () => {
  test('should call DeleteProgram with correct value', async () => {
    const { sut, deleteProgramStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteProgramStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })
})
