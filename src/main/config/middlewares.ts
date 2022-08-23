import { Express } from 'express'
import fileUpload from 'express-fileupload'
import { bodyParser, contentType, cors } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(fileUpload({ useTempFiles: true }))
}
