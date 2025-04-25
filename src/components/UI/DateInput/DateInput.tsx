import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  InputHTMLAttributes,
} from 'react'
import './DateInput.scss'
import { ButtonCalendar } from '../ButtonCalendar/ButtonCalendar'
import { Button } from '../Button/Button'
import Input from '../Input/Input'
import moment, { Moment } from 'moment'

const DATE_FORMAT = 'DD.MM.YYYY'

export interface DateInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  onDateSelect: (date: Date | null) => void
  label?: string
  value?: Date | null
  isRequired?: boolean
  helperText?: string | null
  errorText?: string | null
}

export const DateInput = ({
  label,
  value,
  onDateSelect,
  isRequired = false,
  disabled,
  helperText,
  errorText,
  ...props
}: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<Moment | null>(value ? moment(value) : null)
  const [inputValue, setInputValue] = useState<string>(
    value ? moment(value).format(DATE_FORMAT) : '',
  )
  const [view, setView] = useState<'days' | 'months' | 'years'>('days')
  const [currentDate, setCurrentDate] = useState<Moment>(date || moment())
  const calendarRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (value) {
      const m = moment(value)
      setDate(m)
      setCurrentDate(m)
      setInputValue(m.format(DATE_FORMAT))
    } else {
      setDate(null)
      setInputValue('')
      setCurrentDate(moment())
    }
  }, [value])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8)
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
    setInputValue(formattedValue)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const isValid = !errorText ? inputValue : ''
      if (inputValue.length === 10 && isValid) {
        setIsOpen(prev => !prev)
      }
    }
  }

  const toggleCalendar = () => {
    setIsOpen(open => !open)
    setCurrentDate(date || moment())
    setView('days')
  }

  const handleDayClick = (day: number) => {
    const newDate = currentDate.clone().date(day)
    setDate(newDate)
    setCurrentDate(newDate)
    setInputValue(newDate.format(DATE_FORMAT))
    onDateSelect(newDate.toDate())
    setIsOpen(false)
  }
  const handleMonthClick = (monthIndex: number) => {
    setCurrentDate(currentDate.clone().month(monthIndex).date(1))
    setView('days')
  }

  const handleYearClick = (year: number) => {
    setCurrentDate(currentDate.clone().year(year).month(0).date(1))
    setView('months')
  }

  const goToPrevious = () => {
    setCurrentDate(
      currentDate
        .clone()
        .subtract(
          view === 'days' ? 1 : view === 'months' ? 1 : 10,
          view === 'days' ? 'month' : 'year',
        ),
    )
  }
  const goToNext = () => {
    setCurrentDate(
      currentDate
        .clone()
        .add(
          view === 'days' ? 1 : view === 'months' ? 1 : 10,
          view === 'days' ? 'month' : 'year',
        ),
    )
  }

  const showMonths = () => {
    setView('months')
  }

  const showYears = () => {
    setView('years')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const renderDays = () => {
    const daysInMonth = currentDate.daysInMonth()
    const firstDayOfMonth = currentDate.clone().startOf('month').day()
    const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    const today = moment()

    const isToday = (day: number) => {
      return (
        today.date() === day &&
        today.month() === currentDate.month() &&
        today.year() === currentDate.year()
      )
    }

    const days: JSX.Element[] = []
    for (
      let i = 0;
      i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
      i++
    ) {
      days.push(<div key={`empty-${i}`} />)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const selectedDate = currentDate.clone().date(i)
      const dayOfWeek = selectedDate.day()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const isSelected = date && moment(date).isSame(selectedDate, 'day')

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
    const monthNames = moment.monthsShort()
    return monthNames.map((month, index) => (
      <ButtonCalendar
        key={month}
        text={month}
        onClick={() => handleMonthClick(index)}
      />
    ))
  }

  const renderYears = () => {
    const startYear = Math.floor(currentDate.year() / 20) * 20
    const years = Array.from({ length: 20 }, (_, i) => startYear + i)

    return years.map(year => (
      <ButtonCalendar
        key={year}
        text={year.toString()}
        onClick={() => handleYearClick(year)}
      />
    ))
  }

  const handleBlur = () => {
    const parsed = moment.utc(inputValue, DATE_FORMAT, true)
    if (parsed.isValid()) {
      setDate(parsed)
      setCurrentDate(parsed)
      setInputValue(parsed.format(DATE_FORMAT)) // форматируем строго
      onDateSelect(parsed.toDate())
    } else {
      // Восстанавливаем последнее валидное значение
      setInputValue(date ? date.format(DATE_FORMAT) : '')
    }
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
              text={moment(currentDate).format('MMMM YYYY')}
              onClick={showMonths}
            />
          )}
          {view === 'months' && (
            <Button
              colorType="subdued"
              text={currentDate.format('YYYY')}
              onClick={showYears}
            />
          )}
          {view === 'years' && (
            <span className="body_m_b calendar--title">
              {Math.floor(currentDate.year() / 20) * 20} -{' '}
              {Math.floor(currentDate.year() / 20) * 20 + 19}
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
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="ДД.ММ.ГГГГ"
        maxLength={10}
        iconAfter="CALENDAR"
        disabled={disabled}
        onClickIconAfter={disabled ? undefined : toggleCalendar}
        onBlur={handleBlur}
        iconRefAfter={iconRef}
        errorText={errorText ? errorText : null}
        helperText={helperText}
        {...props}
      />
      {calendarContent}
    </div>
  )
}
