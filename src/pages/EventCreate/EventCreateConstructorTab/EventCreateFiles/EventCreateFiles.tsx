import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { serverFiles } from '../../../../services/api/commonModule/serverFiles/serverFiles'
import { ServerFile } from '../../../../models/serverFile'
import classNames from 'classnames'
import { Icon } from '../../../../components/UI/Icon/Icon'
import './EventCreateFiles.scss'
import { CardFile } from '../../../../components/Cards/CardFile/CardFile'

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
    const uploadedFiles: ServerFile[] = []

    for (const file of filesToUpload || []) {
      const uploadedFile = await serverFiles.uploadFile(file)
      uploadedFiles.push(uploadedFile)
    }

    setFiles(prevFiles => [...prevFiles, ...uploadedFiles])
  }

  return (
    <div className={classNames('area-file')}>
      <label className="body_s_sb label">Материалы</label>
      <div className="areaFile">
        <div className={classNames('upload-area-file')}>
          <div className="upload-text">
            <Icon size="extraLarge" icon="FOLDER_UPLOAD" />
            <span className="body_m_r">
              Перетащите файл в эту область для загрузки или нажмите на неё
            </span>
          </div>
          <input
            type="file"
            multiple
            onChange={uploadFiles}
            placeholder="Загрузить файл"
          />
        </div>
        <div className="cardsFile">
          {files.map((file, index) => (
            <CardFile
              key={file.id}
              url={file.url}
              size={file.size}
              fileName={file.originalName}
              extension={file.extension}
              onRemove={() =>
                setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
