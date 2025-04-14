import { MouseEventHandler, SVGAttributes } from 'react'
import classNames from 'classnames'
import { getIcon, ICON_MAP } from '../../../assets/icons'
import './Icon.scss'

const SIZE_ICONS = ['36px', '30px', '20px', '16px']
const COLOR_ICONS = [
  'primary',
  'secondary',
  'accent',
  'subdued',
  'soft-blue',
  'neutral',
]
type sizeIcon = (typeof SIZE_ICONS)[number] | string | number
type colorIcon = (typeof COLOR_ICONS)[number] | string

interface IconProps extends SVGAttributes<SVGElement> {
  icon: keyof typeof ICON_MAP
  size?: sizeIcon
  colorIcon?: colorIcon
}

export const Icon = ({
  icon,
  size = '20px',
  viewBox = '0 0 20 20',
  colorIcon = 'secondary',
  onClick,
  className,
  ...props
}: IconProps) => {
  const iconSize = SIZE_ICONS.includes(size.toString()) ? size : size
  const iconClass = COLOR_ICONS.includes(colorIcon) ? `icon--${colorIcon}` : ''
  const iconStyle = !COLOR_ICONS.includes(colorIcon) ? { color: colorIcon } : {}

  return (
    <svg
      className={classNames(
        'icon',
        `icon--${size.toString()}`,
        iconClass,
        className,
      )}
      onClick={onClick}
      style={iconStyle}
      viewBox={viewBox}
      width={iconSize}
      height={iconSize}
      dangerouslySetInnerHTML={{ __html: getIcon(icon) }}
      {...props}
    />
  )
}
