import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { AccountModel } from '@/domain/models/account'
import { Decrypter } from '@/data/protocols/cryptography/descrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      await this.loadAccountByTokenRepositoryStub.loadByToken(token, role)
    }
    return null
  }
}
