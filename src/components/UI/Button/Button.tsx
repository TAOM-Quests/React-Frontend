import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import { ICON_MAP } from "../../../assets/icons";
import "./Button.scss"

export type TypeButton = 'primary' | 'secondary' | 'accent' | 'subdued';
export type Size = 'large' | 'small';

export interface ButtonProps
extends ButtonHTMLAttributes<HTMLButtonElement>{
  text?: string
  typeButton?: TypeButton
  backgroundColor?: string
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
  typeButton = 'primary',
  backgroundColor,
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
        'body-m-b',
        'button', 
        `button--${typeButton}`, 
        `button--${size}`,  
        isIconOnlyMode && isButtonCircle && `button--circle`, 
        isIconOnlyMode && 'button--icon-only',
        className
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {isIconOnlyMode && iconToDisplay && (
        <Icon 
          className="button__icon button__icon--only"
          icon={iconToDisplay} 
          typeIcon={typeButton}
        />
      )}
      {!isIconOnlyMode && (
        <>
          {iconBefore && 
            <Icon 
              className="button__icon button__icon--before"
              icon={iconBefore} 
              typeIcon={typeButton}
            />}
          {text && text}
          {iconAfter &&
            <Icon 
              className="button__icon button__icon--after" 
              icon={iconAfter} 
              typeIcon={typeButton}
            />}
        </>
      )}
    </button>
  )
}