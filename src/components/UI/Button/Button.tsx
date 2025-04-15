import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import { ICON_MAP } from '../../../assets/icons'
import './Button.scss'

export type TypeButton = 'primary' | 'secondary' | 'accent' | 'subdued'
export type Size = 'large' | 'small'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  colorType?: TypeButton | { color: string; backgroundColor: string }
  size?: Size
  isIconOnly?: boolean
  isButtonCircle?: boolean
  iconBefore?: keyof typeof ICON_MAP
  iconAfter?: keyof typeof ICON_MAP
}

export const Button = ({
  text,
  iconBefore,
  iconAfter,
  colorType = 'primary',
  size = 'large',
  isButtonCircle = false,
  isIconOnly = false,
  className,
  ...props
}: ButtonProps) => {
  const isIconOnlyMode = isIconOnly || (!text && (iconBefore || iconAfter))
  const iconToDisplay = isIconOnlyMode ? iconBefore : iconBefore || iconAfter

  return (
    <button
      className={classNames(
        'body_m_b',
        'button',
        typeof colorType === 'string' ? `button--${colorType}` : '',
        `button--${size}`,
        isIconOnlyMode && isButtonCircle && `button--circle`,
        isIconOnlyMode && 'button--icon-only',
        className,
      )}
      style={
        typeof colorType !== 'string'
          ? {
              backgroundColor: colorType.backgroundColor,
              color: colorType.color,
            }
          : {}
      }
      {...props}
    >
      {isIconOnlyMode && iconToDisplay && (
        <Icon
          className="button__icon button__icon--only"
          icon={iconToDisplay}
          colorIcon={typeof colorType === 'string' ? colorType : 'secondary'}
        />
      )}
      {!isIconOnlyMode && (
        <>
          {iconBefore && (
            <Icon
              className="button__icon button__icon--before"
              icon={iconBefore}
              colorIcon={
                typeof colorType === 'string' ? colorType : 'secondary'
              }
            />
          )}
          {text && text}
          {iconAfter && (
            <Icon
              className="button__icon button__icon--after"
              icon={iconAfter}
              colorIcon={
                typeof colorType === 'string' ? colorType : 'secondary'
              }
            />
          )}
        </>
      )}
    </button>
  )
}
