import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import { ICON_MAP } from "../../../assets/icons/constants";
import "./Button.scss"

export type Color = 'primary' | 'secondary' | 'accent' | 'subdued';
export type Size = 'large' | 'small';

export interface ButtonProps
extends ButtonHTMLAttributes<HTMLButtonElement>{
  /** Текст кнопки */
  text?: string;
  /** Цвет кнопки */
  color?: Color;
  /** Цвет фона кнопки */
  backgroundColor?: string;
  /** Размер кнопки */
  size?: Size;
  /** Отображать только иконку */
  isIconOnly?: boolean;
  /** Круглая форма кнопки с иконкой */
  isButtonCircle?: boolean;
  /** Иконка перед текстом */
  iconBefore?: keyof typeof ICON_MAP;
  /** Иконка после текста */
  iconAfter?: keyof typeof ICON_MAP;
  /** Отключить кнопку */
  disabled?: boolean
  /** Обработчик щелчков */
  onClick?: () => void;
}

/** Основной компонент пользовательского интерфейса для взаимодействия с пользователем */
export const Button = ({
  text,
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
    <button
      className={classNames(
        'body-m-b',
        'button', 
        `button--${color}`, 
        `button--${size}`,  
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
  )
}