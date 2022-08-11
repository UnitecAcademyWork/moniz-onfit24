import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const ormConfig = new DataSource({
  name: 'default',
  type: 'better-sqlite3',
  database: ':memory:',
  entities: ['src/infra/db/typeorm/entities/*.ts'],
  synchronize: true
})
