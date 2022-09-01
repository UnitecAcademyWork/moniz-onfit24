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
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'onfit24',
  entities: [path.join(__dirname, 'entities/*{.ts,.js}')],
  synchronize: true,
  logging: false
})
