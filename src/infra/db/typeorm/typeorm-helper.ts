import { ormConfig } from '../../../../ormconfig'

export const TypeormHelper = {
  async create (): Promise<void> {
    if (!ormConfig.isInitialized) {
      await ormConfig.initialize()
    }
  },

  async close (): Promise<void> {
    await ormConfig.dropDatabase()
  },

  async clear (): Promise<void> {
    ormConfig.entityMetadatas.forEach(async (entity) => {
      const repo = ormConfig.getRepository(entity.name)
      await repo.query(`DELETE FROM ${entity.tableName}`)
    })
  }
}
