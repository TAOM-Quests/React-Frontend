import classNames from 'classnames'
import { Avatar } from '../../UI/Avatar/Avatar'
import image from '../../../assets/images/mem.png'
import './OptionAvatar.scss'

export type Size = 'small' | 'extraSmall'

export interface OptionAvatarProps {
  avatarSrc?: string
  text: string
  description: string
  size?: Size
  className?: string
}

export const OptionAvatar = ({
  avatarSrc = image,
  text,
  description,
  size = 'small',
  className,
}: OptionAvatarProps) => {
  return (
    <div className={classNames('option-avatar', className)}>
      {avatarSrc && <Avatar src={avatarSrc} size={size} alt={text} />}
      <div className="option-avatar__text">
        <p className="body-m-r option-avatar__text">{text}</p>
        {description && (
          <p className="body-xs-r option-avatar__description">{description}</p>
        )}
      </div>
    </div>
  )
}
