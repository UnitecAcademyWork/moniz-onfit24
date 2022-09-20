import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadAccountDetails } from '@/main/factories/usecases/account/load-account-details/load-account-details'
import { LoadAccountDetailsController } from '@/presentation/controllers/account-details/load-account-details/load-account-details-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadAccountDetailsController = (): Controller => {
  const controller = new LoadAccountDetailsController(makeDbLoadAccountDetails())
  return makeLogControllerDecorator(controller)
}
