export class EmailInUseError extends Error {
  constructor () {
    super('Email ja foi usado')
    this.name = 'EmailInUseError'
  }
}
