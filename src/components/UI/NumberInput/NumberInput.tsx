import React, { InputHTMLAttributes, useRef } from 'react'
import './NumberInput.scss'
import { Icon } from '../Icon/Icon'
import classNames from 'classnames'

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string
  value?: number | null
  onChange?: (value: number | null) => void
  min?: number
  max?: number
  errorText?: string | null
  helperText?: string | null
}

export const NumberInput = ({
  label,
  value = null,
  onChange,
  min,
  max,
  disabled,
  errorText,
  helperText,
  placeholder,
  className,
  ...props
}: NumberInputProps) => {
  const showHelperText = helperText && !errorText
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value
    if (val === '') {
      onChange?.(null)
      return
    }
    const newValue = Number(val)
    if (!isNaN(newValue)) {
      if (min !== undefined && newValue < min) {
        onChange?.(min)
      } else if (max !== undefined && newValue > max) {
        onChange?.(max)
      } else {
        onChange?.(newValue)
      }
    }
  }

  const handleIncrement = () => {
    if (onChange) {
      const currentValue = value === null ? 0 : value
      if (max === undefined || currentValue < max) {
        onChange(currentValue + 1)
      }
    }
  }

  const handleDecrement = () => {
    if (onChange) {
      const currentValue = value === null ? 0 : value
      if (min === undefined || currentValue > min) {
        onChange(currentValue - 1)
      }
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }
  return (
    <div className="inputWrapperNumber">
      {label && <label className="label_inputNumber body_s_sb">{label}</label>}
      <div
        className={classNames(
          'inputContainerNumber',
          errorText && 'inputContainerNumber--invalid',
          disabled && 'inputContainerNumber--disabled',
        )}
      >
        <input
          ref={inputRef}
          type="number"
          value={value === null ? '' : value}
          onChange={handleChange}
          min={min}
          max={max}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={classNames(
            'body_m_r',
            'input_number',
            errorText && 'input_number--invalid',
            className,
          )}
          {...props}
        />
        <div className="input_number--container-icons">
          <Icon icon="ANGLE_UP" onClick={handleIncrement} />
          <Icon icon="ANGLE_DOWN" onClick={handleDecrement} />
        </div>
      </div>
      {showHelperText && (
        <div className="body_s_m helperTextNumber">{helperText}</div>
      )}
      {errorText && <div className="body_s_m errorTextNumber">{errorText}</div>}
    </div>
  )
}
