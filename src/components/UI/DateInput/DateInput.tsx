import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  InputHTMLAttributes,
} from 'react'
import './DateInput.scss'
import { ButtonCalendar } from '../ButtonCalendar/ButtonCalendar'
import { Button } from '../Button/Button'
import Input from '../Input/Input'

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onDateSelect: (date: Date | null) => void
}

export const DateInput = ({ onDateSelect, ...props }: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [valueDate, setValueDate] = useState<Date | null>(null)
  const [valueInput, setValueInput] = useState('')
  const [view, setView] = useState<'days' | 'months' | 'years'>('days')
  const [currentDate, setCurrentDate] = useState(new Date())
  const inputRef = useRef<HTMLInputElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  const monthNames = [
    'Янв',
    'Фев',
    'Март',
    'Апр',
    'Май',
    'Июнь',
    'Июль',
    'Авг',
    'Сент',
    'Окт',
    'Ноя',
    'Дек',
  ]

  useEffect(() => {
    if (valueDate) {
      setValueInput(formatDate(valueDate))
      onDateSelect(valueDate)
    } else {
      setValueInput('')
      onDateSelect(null)
    }
  }, [valueDate, onDateSelect])

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split('.')
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1
      const year = parseInt(parts[2], 10)

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const newDate = new Date(year, month, day)
        if (
          newDate.getDate() === day &&
          newDate.getMonth() === month &&
          newDate.getFullYear() === year
        ) {
          return newDate
        }
      }
    }
    return null
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    value = value.replace(/[^0-9]/g, '')

    // Маска для ввода
    if (value.length > 8) {
      value = value.slice(0, 8)
    }

    let formattedValue = ''
    if (value.length > 2) {
      formattedValue = value.slice(0, 2) + '.' + value.slice(2)
    } else {
      formattedValue = value
    }

    if (formattedValue.length > 5) {
      formattedValue =
        formattedValue.slice(0, 5) + '.' + formattedValue.slice(5)
    }

    setValueInput(formattedValue)

    const parsedDate = parseDate(formattedValue)
    if (parsedDate) {
      setValueDate(parsedDate)
    } else {
      setValueDate(null)
    }

    if (isOpen) {
      setIsOpen(false)
    }
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && valueInput.length === 10) {
      e.preventDefault() // Предотвратить отправку формы
      toggleCalendar()
    }
  }

  const toggleCalendar = () => {
    setIsOpen(!isOpen)
    if (!isOpen && valueDate) {
      setCurrentDate(new Date(valueDate))
    } else {
      setCurrentDate(new Date())
    }
    setView('days')
  }

  const handleDayClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    )
    setValueDate(newDate)
    setIsOpen(false)
  }

  const handleMonthClick = (monthIndex: number) => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), monthIndex, 1))
    setView('days')
  }

  const handleYearClick = (year: number) => {
    setCurrentDate(prevDate => new Date(year, prevDate.getMonth(), 1))
    setView('months')
  }

  const goToPrevious = () => {
    if (view === 'days') {
      setCurrentDate(
        prevDate =>
          new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
      )
    } else if (view === 'months') {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear() - 1, 0, 1))
    } else if (view === 'years') {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear() - 10, 0, 1))
    }
  }

  const goToNext = () => {
    if (view === 'days') {
      setCurrentDate(
        prevDate =>
          new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
      )
    } else if (view === 'months') {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear() + 1, 0, 1))
    } else if (view === 'years') {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear() + 10, 0, 1))
    }
  }

  const showMonths = () => {
    setView('months')
  }

  const showYears = () => {
    setView('years')
  }

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return day === 0 ? 6 : day - 1 // Сдвигаем дни недели, чтобы понедельник был первым днем (0)
  }

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)
    const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    const today = new Date()
    const isToday = (day: number) =>
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()

    const days: JSX.Element[] = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i,
      )
      const dayOfWeek = date.getDay() // 0 (Вс) - 6 (Сб)
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const isSelected =
        valueDate?.getDate() === i &&
        valueDate?.getMonth() === currentDate.getMonth() &&
        valueDate?.getFullYear() === currentDate.getFullYear()

      let dayColorType: string
      if (isToday(i)) {
        dayColorType = 'today'
      } else if (isWeekend) {
        dayColorType = 'weekend'
      } else {
        dayColorType = 'weekday'
      }

      let dayClass: string
      if (isToday(i) || isSelected) {
        dayClass = 'body_m_sb'
      } else {
        dayClass = 'body_m_r'
      }
      if (isSelected) {
        dayClass += ' button_calendar--selected'
      }

      days.push(
        <ButtonCalendar
          key={i}
          text={i}
          colorType={dayColorType}
          onClick={() => handleDayClick(i)}
          className={dayClass}
        />,
      )
    }

    return (
      <>
        {weekdays.map(weekday => (
          <div key={weekday} className="body_s_m calendar--weekday">
            {weekday}
          </div>
        ))}
        {days}
      </>
    )
  }

  const renderMonths = () => {
    return monthNames.map((month, index) => (
      <ButtonCalendar
        key={month}
        text={month}
        onClick={() => handleMonthClick(index)}
      />
    ))
  }

  const renderYears = () => {
    const startYear = Math.floor(currentDate.getFullYear() / 20) * 20
    const years = Array.from({ length: 20 }, (_, i) => startYear + i)

    return years.map(year => (
      <ButtonCalendar
        key={year}
        text={year.toString()}
        onClick={() => handleYearClick(year)}
      />
    ))
  }

  let calendarContent: JSX.Element = <></>

  if (isOpen) {
    calendarContent = (
      <div className="calendar" ref={calendarRef}>
        <div className="calendar--header">
          <Button
            colorType="subdued"
            isIconOnly={true}
            iconBefore="ANGLE_LEFT"
            onClick={goToPrevious}
          />
          {view === 'days' && (
            <Button
              colorType="subdued"
              text={
                monthNames[currentDate.getMonth()] +
                ' ' +
                currentDate.getFullYear()
              }
              onClick={showMonths}
            />
          )}
          {view === 'months' && (
            <Button
              colorType="subdued"
              text={currentDate.getFullYear().toString()}
              onClick={showYears}
            />
          )}
          {view === 'years' && (
            <span className="body_m_b calendar--title">
              {Math.floor(currentDate.getFullYear() / 20) * 20} -{' '}
              {Math.floor(currentDate.getFullYear() / 20) * 20 + 19}
            </span>
          )}
          <Button
            colorType="subdued"
            isIconOnly={true}
            iconBefore="ANGLE_RIGHT"
            onClick={goToNext}
          />
        </div>
        {view === 'days' && (
          <div className="calendar--grid_days">{renderDays()}</div>
        )}
        {view === 'months' && (
          <div className="calendar--grid_months">{renderMonths()}</div>
        )}
        {view === 'years' && (
          <div className="calendar--grid_years">{renderYears()}</div>
        )}
      </div>
    )
  }

  return (
    <div className="calendar-input-container">
      <Input
        type="text"
        value={valueInput}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        ref={inputRef}
        placeholder="ДД.ММ.ГГГГ"
        maxLength={10}
        className="calendar-input"
        iconAfter="CALENDAR"
        {...props}
      />
      {/* <input
        type="text"
        value={valueInput}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        ref={inputRef}
        placeholder="ДД.ММ.ГГГГ"
        maxLength={10}
        className="calendar-input"
      /> */}
      <button onClick={toggleCalendar} className="calendar-icon">
        {/* Replace with your calendar icon */}
        Календарь
      </button>
      {calendarContent}
    </div>
  )
}
