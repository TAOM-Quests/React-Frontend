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
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

export interface DateInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  onDateSelect: (date: Date | null) => void
  label?: string
  value?: string | null
  isRequired?: boolean
  helperText?: string | null
}

export const DateInput = ({
  label,
  value,
  onDateSelect,
  isRequired = false,
  disabled,
  helperText,
  ...props
}: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<moment.Moment | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [view, setView] = useState<'days' | 'months' | 'years'>('days')
  const [currentDate, setCurrentDate] = useState(moment())
  const [dateError, setDateError] = useState<string | null>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)
  moment.updateLocale('ru', {
    months: [
      'Январь',
      'Февраль',
      'Mарт',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthsShort: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
  })

  useEffect(() => {
    if (value) {
      const initialDate = moment.utc(value)
      if (initialDate.isValid()) {
        setDate(initialDate)
      } else {
        setDate(null)
      }
    }
  }, [value])

  useEffect(() => {
    setInputValue(date ? date.format('DD.MM.YYYY') : '')
    onDateSelect(date ? date.clone().utc().toDate() : null)
  }, [date])

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

    const parsedDate = moment.utc(formattedValue, 'DD.MM.YYYY', true)
    setDate(parsedDate.isValid() ? parsedDate : null)
    setDateError(null)
  }

  const validateDate = (dateString: string): boolean => {
    if (!isRequired && !dateString) {
      setDate(null)
      setDateError(null)
      return true
    }

    const parsedDate = moment.utc(dateString, 'DD.MM.YYYY', true)
    if (parsedDate.isValid()) {
      setDate(parsedDate)
      setDateError(null)
      return true
    } else {
      setDate(null)
      setDateError('Некорректная дата')
      return false
    }
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const isValid = validateDate(inputValue)
      if (inputValue.length === 10 && isValid) {
        setIsOpen(prev => !prev)
      }
    }
  }

  const toggleCalendar = () => {
    setIsOpen(prev => !prev)
    setCurrentDate(date || moment())
    setView('days')
  }

  const handleDayClick = (day: number) => {
    setDate(moment.utc(currentDate).date(day))
    setIsOpen(false)
    setDateError(null)
  }

  const handleMonthClick = (monthIndex: number) => {
    setCurrentDate(moment.utc(currentDate).month(monthIndex).date(1))
    setView('days')
  }

  const handleYearClick = (year: number) => {
    setCurrentDate(moment.utc(currentDate).year(year).month(0).date(1))
    setView('months')
  }

  const goToPrevious = () => {
    setCurrentDate(
      moment
        .utc(currentDate)
        .subtract(
          view === 'days' ? 1 : view === 'months' ? 1 : 10,
          view === 'days' ? 'month' : view === 'months' ? 'year' : 'year',
        ),
    )
  }

  const goToNext = () => {
    setCurrentDate(
      moment
        .utc(currentDate)
        .add(
          view === 'days' ? 1 : view === 'months' ? 1 : 10,
          view === 'days' ? 'month' : view === 'months' ? 'year' : 'year',
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

  const handleFocus = () => {
    setDateError(null)
  }

  const handleBlur = () => {
    validateDate(inputValue)
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
        onClickIconAfter={toggleCalendar}
        onBlur={handleBlur}
        iconRefAfter={iconRef}
        onFocus={handleFocus}
        errorText={dateError ? dateError : null}
        helperText={helperText}
        {...props}
      />
      {calendarContent}
    </div>
  )
}
