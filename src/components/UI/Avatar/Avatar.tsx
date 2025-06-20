import classNames from 'classnames'
import { ImgHTMLAttributes, MouseEventHandler } from 'react'
import { Icon } from '../Icon/Icon'
import { ICON_MAP } from '../../../assets/icons'
import './Avatar.scss'

export type Size = 'extraLarge' | 'large' | 'small' | 'extraSmall'

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: Size
  icon?: keyof typeof ICON_MAP
  isRound?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'small',
  icon,
  isRound = true,
  onClick,
  className,
  ...props
}: AvatarProps) => {
  const showIcon = size === 'extraLarge' || size === 'large'

  return (
    <div
      className={classNames(
        'avatar',
        `avatar--${size}`,
        isRound && 'avatar--round',
        showIcon && icon && 'avatar--with-icon',
        onClick && 'avatar--clickable',
        className,
      )}
      onClick={onClick}
    >
      {src && <img src={src} alt={alt} {...props} />}
      {showIcon && icon && (
        <Icon
          icon={icon}
          size="30px"
          colorIcon="primary"
          className="avatar__icon"
        />
      )}
    </div>
  )
}
