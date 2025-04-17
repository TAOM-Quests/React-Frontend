import React, { InputHTMLAttributes } from 'react'
import './Toggle.scss'

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Toggle = ({ onChange, disabled, checked }: ToggleProps) => {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="toggle_input"
      />
      <span className="toggle_slider"></span>
    </label>
  )
}
