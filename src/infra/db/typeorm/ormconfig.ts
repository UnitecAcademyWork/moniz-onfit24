import path from 'path'
import { DataSource } from 'typeorm'
import env from '../../../main/config/env'

export const ormConfig = new DataSource({
  name: env.name,
  type: 'better-sqlite3',
  database: env.database,
  entities: [path.join(__dirname, 'entities/*{.ts,.js}')],
  synchronize: true
})
