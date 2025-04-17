import classNames from 'classnames'
import { Avatar } from '../../UI/Avatar/Avatar'
import image from '../../../assets/images/mem.png'
import './OptionAvatar.scss'

export type Size = 'small' | 'extraSmall'

export interface OptionAvatarProps {
  text: string
  size?: Size
  avatarSrc?: string
  className?: string
  description?: string
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
      {avatarSrc && (
        <Avatar isRound={true} src={avatarSrc} size={size} alt={text} />
      )}
      <div className="option-avatar__info">
        <p className="text_ellipsis body_m_r option-avatar__text">{text}</p>
        {description && (
          <p className="text_ellipsis body_xs_r option-avatar__description">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
