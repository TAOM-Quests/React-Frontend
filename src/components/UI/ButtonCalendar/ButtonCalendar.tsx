import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import './ButtonCalendar.scss'

export type TypeButtonCalendar = 'event' | 'today' | 'weekday' | 'weekend'

export interface ButtonCalendarProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | number
  colorType?: TypeButtonCalendar | string
}

export const ButtonCalendar = ({
  text,
  colorType = 'weekday',
  className,
  ...props
}: ButtonCalendarProps) => {
  return (
    <button
      className={classNames(
        typeof text === 'number'
          ? 'button_calendarNumber'
          : 'body_m_r button_calendarText',
        `button_calendar--${colorType}`,
        className,
      )}
      {...props}
    >
      {text}
    </button>
  )
}
