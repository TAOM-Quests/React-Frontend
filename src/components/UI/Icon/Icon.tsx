import { SVGAttributes } from 'react';
import classNames from "classnames";
import { getIcon, ICON_MAP } from "../../../assets/icons/constants";
import "./Icon.scss";

export type Size = 'extra_large' | 'large' | 'small'| 'extra_small';

export type Color = 'primary' | 'secondary' | 'accent' | 'subdued' | 'soft-blue' |'neutral';

interface IconProps
extends SVGAttributes<SVGElement>{
  /** Выбор иконки */
  icon: keyof typeof ICON_MAP,
  /** Заготовленные размеры иконки */
  size?: Size,
  /** Заготовленные цвета иконки */
  colorIcon?: Color,
   /** Цвет иконки */
  color?: string,
  /** Размер иконки */
  fontSize?: string | number
}

export const Icon = ({
  icon,
  size = 'small',
  fontSize,
  viewBox = '0 0 20 20',
  colorIcon = 'secondary',
  color,
  className,
  ...props
}: IconProps) => {
  return (
    <svg 
      className={classNames(
                'icon',
                `icon--${size}`,
                `icon--color-${colorIcon}`,
                className
                )
              }
      style={{ color }}
      viewBox={viewBox} 
      width={fontSize} 
      height={fontSize}
      dangerouslySetInnerHTML={{__html: getIcon(icon)}}
      {...props}
    />
  );
};