import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { ServerFile } from '../../../models/serverFile'

export interface EventFilesProps {
  files: ServerFile[]
}

export const EventFiles = ({ files }: EventFilesProps) => {
  return (
    <ContainerBox>
      <h5 className="heading_5">Mатериалы</h5>
      {files.map(file => (
        <a key={file.id} href={file.url}>
          {file.originalName}.{file.extension}
        </a>
      ))}
    </ContainerBox>
  )
}
