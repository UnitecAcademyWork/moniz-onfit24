export default {
  db_host: process.env.DATABASE_HOST ?? 'localhost',
  name: process.env.NAME ?? 'default',
  type: process.env.TYPE ?? 'better-sqlite3',
  database: process.env.DATABASE ?? ':memory:',
  db_username: process.env.DATABASE_USERNAME ?? 'root',
  db_password: process.env.DATABASE_PASSWORD ?? '',
  port: process.env.PORT ?? 80,
  jwtsecret: process.env.JWT_SECRET ?? '8JdsZ!@k)Djs',
  cloud_name: process.env.CLOUD_NAME ?? 'dbiknv2eg',
  cloud_key: process.env.CLOUD_KEY ?? '374183494275526',
  cloud_secret: process.env.CLOUD_SECRET ?? 'tGm9Gs6L6kYbsf3ysRFVAKI0vKw'
}
