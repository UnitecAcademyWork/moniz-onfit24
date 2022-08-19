import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogRepository } from '@/infra/db/typeorm/log/log-repository'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logRepository = new LogRepository()
  return new LogControllerDecorator(controller, logRepository)
}
