import { InputHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon } from '../Icon/Icon'
import './Checkbox.scss'
import { generateRandomElementId } from '../../../funcs/generateRandomElementId'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isSelected: boolean
  id?: string
  label?: string | ReactNode
  className?: string
  isDisabled?: boolean
}

export const Checkbox = ({
  id = generateRandomElementId('checkbox'),
  label,
  isSelected,
  onChange,
  isDisabled = false,
  className,
}: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={classNames(
        'checkbox_wrapper',
        {
          'checkbox_wrapper--disabled': isDisabled,
        },
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="checkbox_input"
        checked={isSelected}
        disabled={isDisabled}
        onChange={onChange}
      />
      <span className="checkbox_custom">
        {isSelected && <Icon icon={'CHECK'} size="16px" colorIcon="primary" />}
      </span>

      {label && typeof label === 'string' ? (
        <p className="body_m_r text_ellipsis checkbox_label_string">{label}</p>
      ) : (
        <span
          className={classNames(
            'body_m_r',
            'text_ellipsis ',
            'checkbox_label',
            { text_disabled: isDisabled },
          )}
        >
          {label}
        </span>
      )}
    </label>
  )
}
