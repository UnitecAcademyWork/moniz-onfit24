import { v2 as cloudinary } from 'cloudinary'
import env from '@/main/config/env'
import { File } from '@/domain/models/file'
import { FileUpload } from '@/domain/usecases/file-upload'
import fs from 'fs'

export class CloudnaryAdapter implements FileUpload {
  async upload (file: File): Promise<string> {
    cloudinary.config({
      cloud_name: env.cloud_name,
      api_key: env.cloud_key,
      api_secret: env.cloud_secret
    })
    const result = await (await cloudinary.uploader.upload(file.tempFilePath, { filename_override: file.name, folder: 'onfit24' })).secure_url
    fs.unlinkSync(file.tempFilePath)
    return result
  }
}
