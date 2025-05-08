import { Icon } from '../../UI/Icon/Icon'
import { formatFileSize } from '../formatFileSize'
import './CardImage.scss'

interface CardImageProps {
  id: number
  url: string
  size: number
  imageName: string
  extension: string
  onRemove?: () => void
}

export const CardImage = ({
  id,
  url,
  size,
  imageName,
  extension,
  onRemove,
}: CardImageProps) => (
  <div className={'cardImage'}>
    <div className="cardImage--image">
      <img key={id} src={url} alt={imageName} />
    </div>

    <div className={'cardImage--info'}>
      <span className={'fileName'}>
        <span className="body_m_sb text_ellipsis name">{imageName}</span>
        <span className="body_m_sb extension">.{extension}</span>
      </span>
      <div className={'body_s_m fileSize'}>{formatFileSize(size)}</div>
    </div>
    <Icon
      icon="DELETE"
      className={'cardImage--closeBtn'}
      onClick={onRemove}
      aria-label="Удалить"
    />
  </div>
)
