import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import './Input.scss'
import { Icon } from '../Icon/Icon'
import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import React from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  inputRef?: ForwardedRef<HTMLInputElement>
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  iconAfter?: keyof typeof ICON_MAP
  errorText?: string | null
  helperText?: string | null
  iconBefore?: keyof typeof ICON_MAP
  valueInput?: string | number | ReactNode
  iconRefAfter?: ForwardedRef<SVGSVGElement>
  onClickIconAfter?: () => void
  onClearSelection?: () => void
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
      valueInput,
      onChange,
      type,
      iconRefAfter,
      onBlur,
      onFocus,
      disabled,
      placeholder,
      onClickIconAfter,
      onClearSelection,
      className,
      ...props
    },
    ref,
  ) => {
    const showHelperText = helperText && !errorText
    const [isInputVisible, setIsInputVisible] = useState(true)

    const internalInputRef = useRef<HTMLInputElement>(null)
    const combinedRef = inputRef || ref

    useEffect(() => {
      setIsInputVisible(
        valueInput === null ||
          valueInput === undefined ||
          typeof valueInput === 'string' ||
          typeof valueInput === 'number',
      )
    }, [valueInput])

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
            errorText && 'inputContainer--invalid',
            disabled && 'inputContainer--disabled',
          )}
        >
          {iconBefore && <Icon icon={iconBefore} colorIcon="secondary" />}
          <div
            className={classNames(
              'body_m_r',
              'input',
              errorText && 'input--invalid',
              className,
            )}
            style={{
              display: isInputVisible ? 'none' : 'flex',
              cursor: 'pointer',
            }}
            onClick={handleDivClick}
          >
            {valueInput}
          </div>

          <input
            ref={internalInputRef}
            className={classNames(
              'body_m_r',
              'input',
              errorText && 'input--invalid',
              className,
            )}
            type={type}
            value={
              typeof valueInput === 'string' || typeof valueInput === 'number'
                ? valueInput
                : ''
            }
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            style={{ display: isInputVisible ? 'flex' : 'none' }}
            onFocus={e => {
              setIsInputVisible(true)
              onFocus?.(e)
            }}
            onBlur={e => {
              if (
                valueInput !== null &&
                valueInput !== undefined &&
                typeof valueInput !== 'string' &&
                typeof valueInput !== 'number'
              ) {
                setIsInputVisible(false)
              }
              onBlur?.(e)
            }}
            {...props}
          />
          {onClearSelection &&
            valueInput &&
            (typeof valueInput === 'string' ||
              typeof valueInput === 'number') && (
              <Icon
                icon="CROSS"
                onClick={() => {
                  onClearSelection?.()
                  internalInputRef.current?.focus()
                }}
                colorIcon="secondary"
              />
            )}
          {iconAfter && (
            <Icon
              iconRef={iconRefAfter}
              icon={iconAfter}
              onClick={onClickIconAfter}
              colorIcon="secondary"
            />
          )}
        </div>
        {showHelperText && (
          <div className="body_s_m helperText">{helperText}</div>
        )}
        {errorText && <div className="body_s_m errorText">{errorText}</div>}
      </div>
    )
  },
)

export default Input
