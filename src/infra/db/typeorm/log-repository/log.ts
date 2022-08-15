import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { LogError } from '../entities/log-error'

export class LogRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const logError = new LogError()
    logError.stack = stack
    await logError.save()
  }
}
