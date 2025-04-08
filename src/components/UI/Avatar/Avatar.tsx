import classNames from 'classnames'
import { ImgHTMLAttributes, MouseEventHandler } from 'react'
import { Icon } from '../Icon/Icon'
import { ICON_MAP } from '../../../assets/icons'
import image from '../../../assets/images/mem.png'
import './Avatar.scss'

export type Size = 'extraLarge' | 'large' | 'small' | 'extraSmall'

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: Size
  isRound?: boolean
  icon?: keyof typeof ICON_MAP
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const Avatar = ({
  src = image,
  alt = 'Avatar',
  size = 'small',
  isRound = true,
  icon,
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
