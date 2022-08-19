export class ObjectiveInUseError extends Error {
  constructor () {
    super('Objective already in use')
    this.name = 'ObjectiveInUseError'
  }
}
