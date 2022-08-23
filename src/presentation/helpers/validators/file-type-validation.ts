import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class FileTypeValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fileType: string
  ) {}

  validate (input: any): Error {
    if (!input[this.fieldName].includes(this.fileType)) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
