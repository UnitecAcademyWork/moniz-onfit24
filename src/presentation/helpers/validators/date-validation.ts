import { InvalidParamError } from '../../errors'
import { DateValidator } from '../../protocols/Date-validator'
import { Validation } from '../../protocols/validation'

export class DateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly DateValidator: DateValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.DateValidator.isDate(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
