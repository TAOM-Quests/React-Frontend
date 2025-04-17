import classNames from 'classnames'
import './Badge.scss'

export type TypeBadge =
  | 'primary'
  | 'accent'
  | 'info'
  | 'caution'
  | 'critical'
  | 'success'
  | 'neutral'

export interface BadgeProps {
  text: string | number
  type?: TypeBadge
}

export const Badge = ({ text, type = 'primary' }: BadgeProps) => {
  return (
    <div className={classNames('badge', `badge--${type}`)}>
      <p className="body_xs_sb text_ellipsis badge__text">{text}</p>
    </div>
  )
}
