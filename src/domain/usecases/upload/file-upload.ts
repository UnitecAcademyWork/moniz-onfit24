import { File } from '../../models/file'

export interface FileUpload {
  upload: (file: File) => Promise<string>
}
