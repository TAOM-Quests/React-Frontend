import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  InputHTMLAttributes,
} from 'react'
import './TimeInput.scss'
import Input from '../Input/Input'

interface TimeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  onTimeSelect: (time: string) => void
  label?: string
  value?: string
  helperText?: string
  errorText?: string
}

export const TimeInput = ({
  label,
  value,
  onTimeSelect,
  helperText,
  errorText,
  ...props
}: TimeInputProps) => {
  const [valueInput, setValueInput] = useState(value ?? '')
  const [errorFocus, setErrorFocus] = useState<boolean | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '')
    if (val.length > 4) val = val.slice(0, 4)
    let formatted = val
    if (val.length > 2) formatted = val.slice(0, 2) + ':' + val.slice(2)
    setValueInput(formatted)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
      setErrorFocus(true)
      onTimeSelect(valueInput)
    }
  }

  const handleBlur = () => {
    setErrorFocus(true)
    onTimeSelect(valueInput)
  }
  const handleFocus = () => {
    setErrorFocus(false)
  }

  return (
    <div className="time-input-container">
      <Input
        type="text"
        label={label}
        value={valueInput}
        onKeyDown={handleInputKeyDown}
        onChange={handleInputChange}
        placeholder="ММ:СС"
        maxLength={5}
        className="time-input"
        helperText={helperText}
        iconAfter="TIME"
        errorText={errorFocus ? errorText : null}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
    </div>
  )
}
