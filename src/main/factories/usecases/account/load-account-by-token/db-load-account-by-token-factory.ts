import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '@/infra/db/account/account-repository'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtsecret)
  const accountRepository = new AccountRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountRepository)
}
