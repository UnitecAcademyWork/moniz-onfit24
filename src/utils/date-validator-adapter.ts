import { DateValidator } from '../presentation/protocols/date-validator'
import validator from 'validator'

export class DateValidatorAdapter implements DateValidator {
  isDate (date: string): boolean {
    return validator.isDate(date)
  }
}
