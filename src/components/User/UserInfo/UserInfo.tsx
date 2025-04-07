import classNames from 'classnames'
import { ImgHTMLAttributes, MouseEventHandler } from 'react'
import { Avatar } from '../../UI/Avatar/Avatar'
import { ICON_MAP } from '../../../assets/icons'
import image from '../../../assets/images/mem.png'
import './UserInfo.scss'

export type Size = 'small' | 'extraSmall'

export interface UserInfoProps {
  avatarSrc?: string
  name: string
  position: string
  size?: Size
  className?: string
}

export const UserInfo = ({
  avatarSrc,
  name,
  position,
  size = 'small',
  className,
}: UserInfoProps) => {
  return (
    <div className={classNames('user-info', className)}>
      {avatarSrc && <Avatar src={avatarSrc} size={size} alt={name} />}
      <div className="user-info__text">
        <p className="body-m-r user-info__name">{name}</p>
        {position && (
          <p className="body-xs-r user-info__position">{position}</p>
        )}
      </div>
    </div>
  )
}
