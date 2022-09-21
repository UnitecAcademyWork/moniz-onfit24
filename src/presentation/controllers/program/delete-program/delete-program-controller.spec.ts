import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
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
  url: 'any_url',
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

  test('should return 403 DeleteProgram returns null', async () => {
    const { sut, deleteProgramStub } = makeSut()
    jest.spyOn(deleteProgramStub, 'delete').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('programa inválido')))
  })

  test('should return 500 if DeleteProgram throws', async () => {
    const { sut, deleteProgramStub } = makeSut()
    jest.spyOn(deleteProgramStub, 'delete').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
