import React, {
  HtmlHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import classNames from 'classnames'
import { Icon } from '../Icon/Icon'
import './Checkbox.scss'
import { generateRandomElementId } from '../../../funcs/generateRandomElementId'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  selected: boolean
  id?: string
  label?: string | ReactNode
  disabled?: boolean
  className?: string
}

export const Checkbox = ({
  id = generateRandomElementId('checkbox'),
  label,
  selected,
  onChange,
  disabled = false,
  className,
}: CheckboxProps) => {
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
        onChange={onChange}
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
