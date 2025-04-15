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
        'checkbox_wrapper',
        {
          'checkbox_wrapper--disabled': disabled,
        },
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="checkbox_input"
        checked={selected}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="checkbox_custom">
        {selected && <Icon icon={'CHECK'} size="16px" colorIcon="primary" />}
      </span>

      {label && typeof label === 'string' ? (
        <p className="body_m_r text_ellipsis checkbox_label_string">{label}</p>
      ) : (
        <label
          className={classNames(
            'body_m_r',
            'text_ellipsis ',
            'checkbox_label',
            { text_disabled: disabled },
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </label>
  )
}
