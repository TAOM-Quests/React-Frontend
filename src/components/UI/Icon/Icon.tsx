import { SVGAttributes } from 'react';
import classNames from "classnames";
import "./Icon.scss";

export type Size = 'extra_large' | 'large' | 'small'| 'extra_small';

export type Color = 'primary' | 'secondary' | 'accent' | 'subdued' | 'soft-blue' |'neutral';

interface IconProps
extends SVGAttributes<SVGElement>{
  icon: string,
  size?: Size,
  colorIcon?: Color,
  fontSize?: string | number
}

export const Icon = ({
  icon,
  size = 'small',
  fontSize,
  viewBox = '0 0 20 20',
  colorIcon = 'secondary',
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
      viewBox={viewBox} 
      width={fontSize} 
      height={fontSize}
      dangerouslySetInnerHTML={{__html: icon}}
      {...props}
    />
  );
};