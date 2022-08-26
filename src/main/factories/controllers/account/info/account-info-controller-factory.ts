import { makeAddAccountInfoValidation } from './account-info-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { AddAccountInfoController } from '@/presentation/controllers/account-info/add-account-info-controller'
import { makeDbAddAccountInfo } from '@/main/factories/usecases/account/add-account-info/db-add-accout-info-factory'

export const makeAddAccountInfoController = (): Controller => {
  const controller = new AddAccountInfoController(makeDbAddAccountInfo(), makeAddAccountInfoValidation())
  return makeLogControllerDecorator(controller)
}
