import classNames from 'classnames'
import { Avatar } from '../../UI/Avatar/Avatar'
import './UserAvatarInfo.scss'

export type Size = 'small' | 'extraSmall'

export interface UserAvatarInfoProps {
  text: string
  size?: Size
  avatarSrc?: string
  className?: string
  description?: string
}

export const UserAvatarInfo = ({
  avatarSrc,
  text,
  description,
  size = 'small',
  className,
}: UserAvatarInfoProps) => {
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
