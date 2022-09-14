export class ServerError extends Error {
  constructor (stack: string) {
    super('Erro de servidor')
    this.name = 'ServerError'
    this.stack = stack
  }
}
