import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import './Input.scss'
import { Icon } from '../Icon/Icon'
import { ReactNode, useEffect, useRef, useState } from 'react'
import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  errorText?: string
  iconBefore?: keyof typeof ICON_MAP
  iconAfter?: keyof typeof ICON_MAP
  invalid?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputValue?: string | number | ReactNode
  onClearSelection?: () => void
}

export default function Input({
  label,
  helperText,
  errorText,
  iconBefore,
  iconAfter,
  invalid,
  inputValue,
  onChange,
  type,
  onBlur,
  onFocus,
  disabled,
  placeholder,
  onClearSelection,
  className,
  ...props
}: InputProps) {
  const showHelperText = helperText && !invalid
  const showErrorText = invalid && errorText
  const [isInputVisible, setIsInputVisible] = useState(true) // Изначально показываем input
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const isReactNode =
      typeof inputValue !== 'string' && typeof inputValue !== 'number'
    setIsInputVisible(!isReactNode)
  }, [inputValue])

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation() // Останавливаем всплытие события
    setIsInputVisible(true) // Показываем input при клике на div
    onClearSelection?.() // Очищаем выбор в Dropdown
    setTimeout(() => {
      inputRef.current?.focus() // Фокусируемся на input после его отображения
    }, 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }

  return (
    <div className="inputWrapper">
      {label && <label className="label body-s-sb">{label}</label>}
      <div
        className={classNames(
          'inputContainer',
          invalid && 'inputContainer--invalid',
          disabled && 'inputContainer--disabled',
        )}
      >
        {iconBefore && <Icon icon={iconBefore} colorIcon="secondary" />}
        <div
          className={classNames(
            'body-m-r',
            'input',
            invalid && 'input--invalid',
            className,
          )}
          style={{
            display: isInputVisible ? 'none' : 'block',
            cursor: 'pointer',
          }}
          onClick={handleDivClick}
        >
          {inputValue}
        </div>
        <input
          ref={inputRef}
          className={classNames(
            'body-m-r',
            'input',
            invalid && 'input--invalid',
            className,
          )}
          type={type}
          value={
            typeof inputValue === 'string' || typeof inputValue === 'number'
              ? inputValue
              : ''
          }
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          style={{ display: isInputVisible ? 'block' : 'none' }}
          onFocus={onFocus}
          onBlur={e => {
            if (
              typeof inputValue !== 'string' &&
              typeof inputValue !== 'number'
            ) {
              setIsInputVisible(false)
            }
            onBlur?.(e)
          }}
          {...props}
        />
        {iconAfter && <Icon icon={iconAfter} colorIcon="secondary" />}
      </div>
      {showHelperText && (
        <div className="body-s-m helperText">{helperText}</div>
      )}
      {showErrorText && <div className="body-s-m errorText">{errorText}</div>}
    </div>
  )
}
