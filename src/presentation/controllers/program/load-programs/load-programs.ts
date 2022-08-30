import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadPrograms } from './load-program.protocols'

export class LoadProgramsController implements Controller {
  constructor (private readonly loadPrograms: LoadPrograms) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const programs = await this.loadPrograms.load()
      return programs.length ? ok(programs) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
