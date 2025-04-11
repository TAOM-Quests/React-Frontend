import React from 'react'
import { OptionAvatar } from '../../User/OptionAvatar/OptionAvatar'
import './Tag.scss'
import { Icon } from '../Icon/Icon'
import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'

export type Type = 'primary' | 'secondary' | 'info'
export type Size = 'large' | 'small'

interface TagProps {
  text: string
  avatarSrc?: string
  description?: string
  iconBefore?: keyof typeof ICON_MAP
  iconAfter?: keyof typeof ICON_MAP
  type?: Type
  size?: Size
  onRemove?: () => void
}

export const Tag = ({
  text,
  avatarSrc,
  description,
  iconBefore,
  iconAfter,
  type = 'primary',
  size = 'large',
  onRemove,
}: TagProps) => {
  return (
    <div className={classNames('tag', `tag--${type}`, `tag--${size}`)}>
      {iconBefore && <Icon icon={iconBefore} />}
      {avatarSrc ? (
        <OptionAvatar
          size="extraSmall"
          avatarSrc={avatarSrc}
          text={text}
          description={description}
        />
      ) : (
        <span>{text}</span>
      )}
      {iconAfter && <Icon icon={iconAfter} />}
      {onRemove && (
        <Icon className="tag__remove" icon={'CROSS'} onClick={onRemove} />
      )}
    </div>
  )
}
