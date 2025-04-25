import { Ref, SVGAttributes } from 'react'
import classNames from 'classnames'
import { getIcon, ICON_MAP } from '../../../assets/icons'
import './Icon.scss'

const SIZE_ICONS = ['extraLarge', 'large', 'small', 'extraSmall']
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
  iconRef?: Ref<SVGSVGElement>
  colorIcon?: colorIcon
  disabled?: boolean
}

export const Icon = ({
  icon,
  size = 'small',
  colorIcon = 'secondary',
  onClick,
  iconRef,
  className,
  disabled,
  ...props
}: IconProps) => {
  const sizeClass = SIZE_ICONS.includes(size.toString()) ? `icon--${size}` : ''
  const sizeStyle = !SIZE_ICONS.includes(size.toString())
    ? { width: size, height: size }
    : {}
  const colorClass = COLOR_ICONS.includes(colorIcon) ? `icon--${colorIcon}` : ''
  const colorStyle = !COLOR_ICONS.includes(colorIcon)
    ? { color: colorIcon }
    : {}

  return (
    <svg
      ref={iconRef}
      className={classNames(
        'icon',
        sizeClass,
        colorClass,
        `${onClick && 'icon--click'}`,
        `${disabled && 'icon--disabled'}`,
        className,
      )}
      onClick={disabled ? undefined : onClick}
      style={{ ...sizeStyle, ...colorStyle }}
      viewBox={'0 0 20 20'}
      dangerouslySetInnerHTML={{ __html: getIcon(icon) }}
      {...props}
    />
  )
}
