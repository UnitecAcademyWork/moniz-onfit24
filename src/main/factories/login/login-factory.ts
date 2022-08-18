import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from '../../factories/login/login-validation-factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { LogRepository } from '../../../infra/db/typeorm/log/log-repository'
import { AccountRepository } from '../../../infra/db/typeorm/account/account-repository'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adpter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtsecret)
  const accountRepository = new AccountRepository()
  const dbAuthentication = new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logRepository = new LogRepository()
  return new LogControllerDecorator(loginController, logRepository)
}
