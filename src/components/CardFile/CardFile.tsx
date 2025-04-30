import React from 'react'
import './CardFile.scss'
import { Icon } from '../UI/Icon/Icon'

interface CardFileProps {
  fileName: string
  size: number
  url: string
  extension: string
  onRemove?: () => void
}

const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} Б`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} КБ`
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(1)} МБ`
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} ГБ`
}

const CardFile: React.FC<CardFileProps> = ({
  fileName,
  size,
  url,
  extension,
  onRemove,
}) => (
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

export default CardFile
