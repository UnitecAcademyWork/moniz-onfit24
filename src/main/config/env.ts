export default {
  name: process.env.NAME || 'default',
  type: process.env.TYPE || 'better-sqlite3',
  database: process.env.DATABASE || ':memory:',
  port: process.env.PORT || 5000,
  jwtsecret: process.env.JWT_SECRET || '8JdsZ!@k)Djs'
}
