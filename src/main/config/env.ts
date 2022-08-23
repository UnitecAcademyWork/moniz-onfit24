export default {
  name: process.env.NAME ?? 'default',
  type: process.env.TYPE ?? 'better-sqlite3',
  database: process.env.DATABASE ?? ':memory:',
  port: process.env.PORT ?? 5000,
  jwtsecret: process.env.JWT_SECRET ?? '8JdsZ!@k)Djs',
  cloud_name: process.env.CLOUD_NAME ?? 'dbiknv2eg',
  cloud_key: process.env.CLOUD_KEY ?? '374183494275526',
  cloud_secret: process.env.CLOUD_SECRET ?? 'tGm9Gs6L6kYbsf3ysRFVAKI0vKw'
}
