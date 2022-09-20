import 'module-alias/register'
import env from './config/env'
import { TypeormHelper } from '@/infra/db/typeorm-helper'
import 'reflect-metadata'

TypeormHelper.create().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(80, () => console.log(`Server is running at http://localhost:${env.port}`))
}).catch(console.error)
