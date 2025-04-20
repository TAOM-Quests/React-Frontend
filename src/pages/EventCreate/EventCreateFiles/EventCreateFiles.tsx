import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'
import { ServerFile } from '../../../models/serverFile'

export interface EventCreateFilesProps {
  files: ServerFile[]
  setFiles: Dispatch<SetStateAction<ServerFile[]>>
}

export const EventCreateFiles = ({
  files,
  setFiles,
}: EventCreateFilesProps) => {
  const uploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const filesToUpload = e.target.files
    const uploadedFiles = []

    for (const file of filesToUpload || []) {
      const uploadedFile = await serverFiles.uploadFile(file)
      const fileStat = await serverFiles.getFile(uploadedFile.name)
      uploadedFiles.push(fileStat)
    }

    setFiles(uploadedFiles)
  }

  return (
    <div>
      <input type="file" multiple onChange={uploadFiles} />
      {files.map(file => (
        <a key={file.id} href={file.url}>
          {file.originalName}.{file.extension}
        </a>
      ))}
    </div>
  )
}
