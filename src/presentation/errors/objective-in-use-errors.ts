export class ObjectiveInUseError extends Error {
  constructor () {
    super('Objectivo já existe')
    this.name = 'ObjectiveInUseError'
  }
}
