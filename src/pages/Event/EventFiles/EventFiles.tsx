import { CardFile } from '../../../components/CardFile/CardFile'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { ServerFile } from '../../../models/serverFile'
import './EventFiles.scss'

export interface EventFilesProps {
  files: ServerFile[]
}

export const EventFiles = ({ files }: EventFilesProps) => {
  return (
    <ContainerBox>
      <h5 className="heading_5 event-files__title">Mатериалы</h5>
      <div className="event-files">
        {files.map(file => (
          <CardFile
            key={file.id}
            url={file.url}
            size={file.size}
            fileName={file.originalName}
            extension={file.extension}
          />
        ))}
      </div>
    </ContainerBox>
  )
}
