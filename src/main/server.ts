import env from './config/env'
import { TypeormHelper } from '../infra/db/typeorm/typeorm-helper'

TypeormHelper.create().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log(`Server is running at http://localhost:${env.port}`))
}).catch(console.error)
