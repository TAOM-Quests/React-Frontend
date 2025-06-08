import React, { InputHTMLAttributes, useRef, useState } from 'react'
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
  errorText?: string
  helperText?: string
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
  const [valueInput, setValueInput] = useState(value ?? null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === '') {
      onChange?.(null)
      setValueInput(null)
      return
    }
    const num = Number(val)
    if (!isNaN(num)) {
      setValueInput(num)
      onChange?.(num)
    }
  }

  const handleIncrement = () => {
    setValueInput(prev => {
      const next = prev === null ? 1 : prev + 1
      if (max !== undefined && next > max) return prev
      onChange?.(next)
      return next
    })
  }

  const handleDecrement = () => {
    setValueInput(prev => {
      if (prev === null) return null
      const next = prev - 1
      if (min !== undefined && next < min) {
        onChange?.(null)
        return null
      }

      onChange?.(next)
      return next
    })
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputRef.current) {
        inputRef.current.blur()
      }
      onChange?.(valueInput)
    }
  }

  const handleBlur = () => {
    onChange?.(valueInput)
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
          value={valueInput === null ? '' : valueInput}
          onChange={handleChange}
          min={min}
          max={max}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={handleBlur}
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
