import { LogError } from '../entities/log-error'
import { LogErrorRepository } from '@/data/protocols/db/log-error-repository'

export class LogRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const logError = new LogError()
    logError.stack = stack
    await logError.save()
  }
}
