import { makeAddAccountInfoValidation } from './account-details-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { AddAccountDetailsController } from '@/presentation/controllers/account-details/add-account-details/add-account-details-controller'
import { makeDbAddAccountDetails } from '@/main/factories/usecases/account/add-account-info/db-add-accout-info-factory'

export const makeAddAccountDetailsController = (): Controller => {
  const controller = new AddAccountDetailsController(makeDbAddAccountDetails(), makeAddAccountInfoValidation())
  return makeLogControllerDecorator(controller)
}
