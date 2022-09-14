export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Parâmetro em falta: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
