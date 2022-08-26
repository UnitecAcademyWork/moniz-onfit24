import { FloatValidator } from '../presentation/protocols/float-validator'
import validator from 'validator'

export class FloatValidatorAdapter implements FloatValidator {
  isFloat (number: string): boolean {
    return validator.isFloat(number)
  }
}
