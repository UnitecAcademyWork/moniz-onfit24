import { ormConfig } from '../../../../ormconfig'

export const TypeormHelper = {
  async create (): Promise<void> {
    await ormConfig.initialize()
  },

  async close (): Promise<void> {
    await ormConfig.destroy()
  },

  async clear (): Promise<void> {
    await ormConfig.dropDatabase()
  }
}
