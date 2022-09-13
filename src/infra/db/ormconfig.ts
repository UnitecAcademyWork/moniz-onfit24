import path from 'path'
import { DataSource } from 'typeorm'
import env from '@/main/config/env'

export const ormConfig = new DataSource({
  name: env.name,
  type: 'better-sqlite3',
  database: env.database,
  entities: [path.join(__dirname, 'entities/*{.ts,.js}')],
  synchronize: true
})

export const ormConfig2 = new DataSource({
  type: 'mysql',
  host: env.db_host,
  port: 3306,
  username: env.db_username,
  password: env.db_password,
  database: env.database,
  entities: [path.join(__dirname, 'entities/*{.ts,.js}')],
  synchronize: true,
  logging: false
})
