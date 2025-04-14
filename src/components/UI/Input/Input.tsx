import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import './Input.scss'
import { Icon } from '../Icon/Icon'
import {
  ForwardedRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
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
  inputRef?: ForwardedRef<HTMLInputElement>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputRef,
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
    },
    ref,
  ) => {
    const showHelperText = helperText && !invalid
    const showErrorText = invalid && errorText
    const [isInputVisible, setIsInputVisible] = useState(true) // Изначально показываем input

    const internalInputRef = useRef<HTMLInputElement>(null)
    const combinedRef = inputRef || ref

    useEffect(() => {
      setIsInputVisible(
        typeof inputValue === 'string' || typeof inputValue === 'number',
      )
    }, [inputValue])

    // UseImperativeHandle для передачи фокуса
    useImperativeHandle(
      combinedRef,
      () =>
        ({
          focus: () => internalInputRef.current?.focus(),
          blur: () => internalInputRef.current?.blur(),
        }) as HTMLInputElement,
    )

    const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation() // Останавливаем всплытие события
      setIsInputVisible(true) // Показываем input при клике на div
      setTimeout(() => {
        internalInputRef.current?.focus()
      }, 0) //  <---  Устанавливаем фокус на input
      onClearSelection?.() // Очищаем выбор в Dropdown
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    return (
      <div className="inputWrapper">
        {label && <label className="label body_s_sb">{label}</label>}
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
              'body_m_r',
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
            ref={internalInputRef}
            className={classNames(
              'body_m_r',
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
            onFocus={e => {
              setIsInputVisible(true)
              onFocus?.(e)
            }}
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
          <div className="body_s_m helperText">{helperText}</div>
        )}
        {showErrorText && <div className="body_s_m errorText">{errorText}</div>}
      </div>
    )
  },
)

export default Input
