import 'reflect-metadata'
import { DataSource } from 'typeorm'
import env from './src/main/config/env'

export const ormConfig = new DataSource({
  name: env.name,
  type: 'better-sqlite3',
  database: env.database,
  entities: ['src/infra/db/typeorm/entities/*.ts'],
  synchronize: true
})
