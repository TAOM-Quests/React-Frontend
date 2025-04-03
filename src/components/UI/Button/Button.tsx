import classNames from "classnames";
import "./Button.scss"
import { ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";

export type Color = 'primary' | 'secondary' | 'accent' | 'subdued';
export type Size = 'large' | 'small';

export interface ButtonProps
extends ButtonHTMLAttributes<HTMLButtonElement>{
  /** Текст кнопки */
  text?: string;
  /** Какого цвета кнопка */
  color?: Color;
  /** Какой цвет фона использовать */
  backgroundColor?: string;
  /** Какого размера должна быть кнопка? */
  size?: Size;
  /** Отображать только иконку */
  isIconOnly?: boolean;
  /** Форма кнопки с иконкой круглая? */
  isButtonCircle?: boolean;
  /** Иконка перед текстом в виде HTML */
  iconBefore?: string;
  /** Иконка после текста в виде HTML */
  iconAfter?: string;
  /** Обработчик щелчков */
  onClick?: () => void;
}

/** Основной компонент пользовательского интерфейса для взаимодействия с пользователем */
export const Button = ({
  text,
  className,
  type = 'button',
  iconBefore,
  iconAfter,
  color = 'primary',
  backgroundColor,
  size = 'large',
  isButtonCircle = false,
  isIconOnly = false,
  ...props
}: ButtonProps) => {
  const isIconOnlyMode = isIconOnly || (!text && (iconBefore || iconAfter));

  const iconToDisplay = isIconOnlyMode ? iconBefore : iconBefore || iconAfter;

  return (
    <>
      <button
        className={classNames(
          'body-m-b',
          'button', 
          `button--${color}`, 
          `button--${size}`, 
          className, 
          isIconOnlyMode && isButtonCircle && `button--circle`, 
          isIconOnlyMode && 'button--icon-only')
        }
        style={{ backgroundColor }}
        {...props}
      >
        {isIconOnlyMode && iconToDisplay && (
          <Icon 
            className="button__icon button__icon--only"
            icon={iconToDisplay} 
            colorIcon={color}
          />
        )}
        {!isIconOnlyMode && (
          <>
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
          </>
        )}
      </button>
    </>
  )
  
}