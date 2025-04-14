import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { Icon } from '../Icon/Icon'
import './Checkbox.scss'

export interface CheckboxProps {
  id: string
  label?: string | ReactNode
  selected: boolean
  onSelect: (id: string) => void
  disabled?: boolean
  className?: string
}

export const Checkbox = ({
  id,
  label,
  selected,
  onSelect,
  disabled = false,
  className,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    onSelect(id)
  }

  return (
    <label
      className={classNames(
        'checkbox-wrapper',
        {
          'checkbox-wrapper--disabled': disabled,
        },
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="checkbox-input"
        checked={selected}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="checkbox-custom">
        {selected && <Icon icon={'CHECK'} size="16px" colorIcon="primary" />}
      </span>

      {label && typeof label === 'string' ? (
        <p className="body_m_r text_ellipsis checkbox_label_string">{label}</p>
      ) : (
        <label className="body_m_r text_ellipsis checkbox_label" htmlFor={id}>
          {label}
        </label>
      )}
    </label>
  )
}
