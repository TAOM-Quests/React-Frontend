import { UserAvatarInfo } from '../../User/UserAvatarInfo/UserAvatarInfo'
import './Tag.scss'
import { Icon } from '../Icon/Icon'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'

export type Type = 'primary' | 'secondary' | 'subdued'
export type Size = 'large' | 'small'

interface TagProps {
  text: string
  type?: Type
  size?: Size
  onRemove?: () => void
  avatarSrc?: string
  iconAfter?: keyof typeof ICON_MAP
  iconBefore?: keyof typeof ICON_MAP
  description?: string
}

export const Tag = ({
  text,
  avatarSrc,
  description,
  iconBefore,
  iconAfter,
  type = 'secondary',
  size = 'large',
  onRemove,
}: TagProps) => {
  return (
    <div
      className={classNames(
        'tag',
        `tag--${type}`,
        `tag--${size}`,
        avatarSrc && `tag--avatar`,
      )}
    >
      {iconBefore && <Icon icon={iconBefore} colorIcon={type} />}
      {avatarSrc ? (
        <UserAvatarInfo
          size="extraSmall"
          avatarSrc={avatarSrc}
          text={text}
          description={description}
        />
      ) : (
        <p className="body_s_sb text_ellipsis">{text}</p>
      )}
      {iconAfter && <Icon icon={iconAfter} colorIcon={type} />}
      {onRemove && (
        <Icon
          className="tag__remove"
          icon={'CROSS'}
          colorIcon={type}
          onClick={onRemove}
        />
      )}
    </div>
  )
}
