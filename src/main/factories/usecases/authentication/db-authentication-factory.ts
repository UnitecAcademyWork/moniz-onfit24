import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { Authentication } from '@/data/usecases/authentication/db-authentication.protocols'
import { AccountRepository } from '@/infra/db/account/account-repository'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adpter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtsecret)
  const accountRepository = new AccountRepository()
  return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
}
