import { SVGAttributes } from 'react'
import classNames from 'classnames'
import { getIcon, ICON_MAP } from '../../../assets/icons'
import './Icon.scss'

export type Size = '36px' | '30px' | '20px' | '16px'

export type typeIcon =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'subdued'
  | 'soft-blue'
  | 'neutral'

interface IconProps extends SVGAttributes<SVGElement> {
  icon: keyof typeof ICON_MAP
  size?: Size
  typeIcon?: typeIcon
  fontSize?: string | number
}

export const Icon = ({
  icon,
  size = '20px',
  fontSize,
  viewBox = '0 0 20 20',
  typeIcon = 'secondary',
  color,
  className,
  ...props
}: IconProps) => {
  const iconSize = fontSize ? fontSize : size

  return (
    <svg
      className={classNames(
        'icon',
        `icon--${size}`,
        `icon--color-${typeIcon}`,
        className,
      )}
      style={{ color }}
      viewBox={viewBox}
      width={iconSize}
      height={iconSize}
      dangerouslySetInnerHTML={{ __html: getIcon(icon) }}
      {...props}
    />
  )
}
