import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddWeekToProgramController } from './add-week-to-program-controller'
import { AddWeekToProgram, HttpRequest, ProgramModel } from './add-week-to-program-controller.protocols'

const makeFakeProgram = (): ProgramModel => ({
  id: 'any_id',
  url: 'any_url',
  name: 'any_name',
  description: 'any_description',
  difficulty: 'any_difficulty',
  duration: 'any_duration',
  objective: ['any_objective', 'other_objective'],
  equipment: ['any_equipment', 'other_equipment'],
  weeks: [
    {
      id: 'exercise_id',
      goals: ['any_goal'],
      exercises: [{
        duration: 'any_duration',
        title: 'any_title',
        uri: 'any_uri',
        url: 'any_url'
      }]
    }
  ]
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    programId: 'program_id',
    weekId: 'week_id'
  }
})

const makeAddWeekToProgram = (): AddWeekToProgram => {
  class AddWeekToProgramStub implements AddWeekToProgram {
    async associate (programId: string, weekId: string): Promise<ProgramModel> {
      return Promise.resolve(makeFakeProgram())
    }
  }
  return new AddWeekToProgramStub()
}

interface SutTypes {
  addWeekToProgramStub: AddWeekToProgram
  sut: AddWeekToProgramController
}

const makeSut = (): SutTypes => {
  const addWeekToProgramStub = makeAddWeekToProgram()
  const sut = new AddWeekToProgramController(addWeekToProgramStub)
  return { sut, addWeekToProgramStub }
}

describe('AddWeekToProgram Controller', () => {
  test('should call AddWeekToProgram with correct values', async () => {
    const { sut, addWeekToProgramStub } = makeSut()
    const associateSpy = jest.spyOn(addWeekToProgramStub, 'associate')
    await sut.handle(makeFakeRequest())
    expect(associateSpy).toHaveBeenCalledWith('program_id', 'week_id')
  })

  test('should return 403 if AddWeekToProgram returns null', async () => {
    const { sut, addWeekToProgramStub } = makeSut()
    jest.spyOn(addWeekToProgramStub, 'associate').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('invalidId')))
  })

  test('should return 500 if AddWeekToProgram throws', async () => {
    const { sut, addWeekToProgramStub } = makeSut()
    jest.spyOn(addWeekToProgramStub, 'associate').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProgram()))
  })
})
