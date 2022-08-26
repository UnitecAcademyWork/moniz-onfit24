import { InvalidParamError } from '../../errors'
import { FloatValidator } from '../../protocols/Float-validator'
import { Validation } from '../../protocols/validation'

export class FloatValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly FloatValidator: FloatValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.FloatValidator.isFloat(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
