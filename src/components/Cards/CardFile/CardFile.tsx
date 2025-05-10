import { Icon } from '../../UI/Icon/Icon'
import { formatFileSize } from '../formatFileSize'
import './CardFile.scss'

interface CardFileProps {
  url: string
  size: number
  fileName: string
  extension: string
  onRemove?: () => void
}

export const CardFile = ({
  url,
  size,
  fileName,
  onRemove,
  extension,
}: CardFileProps) => (
  <div className={'cardFile'}>
    <div className={'cardFile--iconFile'}>
      <Icon colorIcon="subdued" className="iconFile " icon="FILE" />
      <span className={'docText'}>{extension.toLocaleUpperCase()}</span>
    </div>

    <div className={'cardFile--info'}>
      <span className={'fileName'}>
        <span className="body_m_sb text_ellipsis name">{fileName}</span>
        <span className="body_m_sb extension">.{extension}</span>
      </span>
      <div className={'body_s_m fileSize'}>{formatFileSize(size)}</div>
    </div>

    <a href={url} aria-label="Сохранить">
      <Icon className={'cardFile--saveBtn'} icon="DOWNLOAD" />
    </a>

    <Icon
      icon="DELETE"
      className={'cardFile--closeBtn'}
      onClick={onRemove}
      aria-label="Удалить"
    />
  </div>
)
