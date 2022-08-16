import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adpter'
import { AccountRepository } from '../../infra/db/typeorm/account-repository/account'
import { LogRepository } from '../../infra/db/typeorm/log-repository/log'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logRepository = new LogRepository()
  return new LogControllerDecorator(signUpController, logRepository)
}
