import classNames from "classnames";
import "./Button.scss"
import { ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";

export type Color = 'primary' | 'secondary' | 'accent' | 'subdued';
export type Size = 'large' | 'small';
export type ButtonIconShape = 'square' | 'circle';

export interface ButtonProps
extends ButtonHTMLAttributes<HTMLButtonElement>{
  text?: string;
  iconBefore?: string;
  iconAfter?: string;
  color?: Color;
  size?: Size;
  shape?: ButtonIconShape;
}

export const Button = ({
  text,
  className,
  type = 'button',
  iconBefore,
  iconAfter,
  color = 'primary',
  size = 'small',
  shape = 'square',
  ...props
}: ButtonProps) => {
  // const {} = props
  const isIconOnly = !text && (iconBefore || iconAfter);

  return (
    <>
      <button
        className={classNames(
          'body-m-b',
          'button', 
          `button--${color}`, 
          `button--${size}`, 
          className, 
          isIconOnly && `button--${shape}`, 
          isIconOnly && 'button--icon-only')
        }
        {...props}
      >
        {iconBefore && 
          <Icon 
            className="button__icon button__icon--before"
            icon={iconBefore} 
            colorIcon={color}
          />}
        {text && text}
        {iconAfter &&
          <Icon 
            className="button__icon button__icon--after" 
            icon={iconAfter} 
            colorIcon={color}
          />}
      </button>
    </>
  )
  
}