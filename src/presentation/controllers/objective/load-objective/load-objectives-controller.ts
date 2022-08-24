import { ok } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../add-objective/add-objective-controller.protocols'
import { Controller, LoadObjectives } from './load-objectives-controller.protocol'

export class LoadObjectivesController implements Controller {
  constructor (private readonly loadObjectives: LoadObjectives) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const objectives = await this.loadObjectives.load()
    return ok(objectives)
  }
}
