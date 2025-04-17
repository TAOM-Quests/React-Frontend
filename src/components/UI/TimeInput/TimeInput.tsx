import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  InputHTMLAttributes,
} from 'react'
import './TimeInput.scss'
import Input from '../Input/Input'

interface TimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onTimeSelect: (time: string | null) => void
  isRequired?: boolean
}

export const TimeInput = ({
  onTimeSelect,
  isRequired = false,
  ...props
}: TimeInputProps) => {
  const [valueInput, setValueInput] = useState('')
  const [timeError, setTimeError] = useState<string | null>(null)
  // Маска для ввода времени
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '')
    if (val.length > 4) val = val.slice(0, 4)
    let formatted = val
    if (val.length > 2) formatted = val.slice(0, 2) + ':' + val.slice(2)
    setValueInput(formatted)
    setTimeError(null)
  }
  const validateTime = (time: string) => {
    if (!time && !isRequired) {
      setTimeError(null)
      onTimeSelect(null) // если не обязательно и пусто, то null
      return true
    }

    if (time.length === 5) {
      const [hh, mm] = time.split(':')
      const h = Number(hh)
      const m = Number(mm)

      if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        setTimeError(null)
        onTimeSelect(`${hh}:${mm}`)
        return true
      } else {
        setTimeError('Некорректное время (ЧЧ:ММ)')
        onTimeSelect(null)
        return false
      }
    } else {
      setTimeError('Введите время в формате ЧЧ:ММ')
      onTimeSelect(null)
      return false
    }
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validateTime(valueInput)
    }
  }

  const handleBlur = () => {
    validateTime(valueInput)
  }

  return (
    <div className="time-input-container">
      <Input
        type="text"
        valueInput={valueInput}
        onKeyDown={handleInputKeyDown}
        onChange={handleInputChange}
        placeholder="ЧЧ:ММ"
        maxLength={5}
        className="time-input"
        iconAfter="TIME"
        errorText={timeError ? timeError : null}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  )
}
