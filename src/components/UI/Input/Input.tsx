import classNames from 'classnames'
import { ICON_MAP } from '../../../assets/icons'
import './Input.scss'
import { Icon } from '../Icon/Icon'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  errorText?: string
  iconBefore?: keyof typeof ICON_MAP
  iconAfter?: keyof typeof ICON_MAP
  invalid?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  helperText,
  errorText,
  iconBefore,
  iconAfter,
  invalid,
  value,
  onChange,
  type,
  disabled,
  placeholder,
  className,
  ...props
}: InputProps) {
  const showHelperText = helperText && !invalid
  const showErrorText = invalid && errorText

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
        <input
          className={classNames(
            'body-m-r',
            'input',
            invalid && 'input--invalid',
            className,
          )}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
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
