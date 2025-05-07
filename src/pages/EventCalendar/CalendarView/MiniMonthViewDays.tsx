import { ReactNode } from 'react'
import moment, { Moment } from 'moment'
import { CalendarMonthDay } from '../CalendarMonthDay/CalendarMonthDay'
import { EventMinimize } from '../../../models/eventMinimize'

interface MiniMonthViewDaysProps {
  month: Moment
  events: EventMinimize[]
}

export const MiniMonthViewDays = ({
  month,
  events,
}: MiniMonthViewDaysProps): ReactNode => {
  const daysInMonth = month.daysInMonth()
  const firstDayOfMonth = month.clone().date(1)
  const weekDayIndex = firstDayOfMonth.isoWeekday()

  const emptyCells = []
  for (let i = 1; i < weekDayIndex; i++) {
    emptyCells.push(
      <div
        key={`empty-${i}`}
        className="calendarMonthDay calendarMonthDay--empty"
      />,
    )
  }

  const daysComponents: JSX.Element[] = []
  for (let i = 1; i <= daysInMonth; i++) {
    const day = month.clone().date(i)
    const dayEvents = events.filter(event =>
      moment(event.date).isSame(day, 'day'),
    )
    daysComponents.push(
      <CalendarMonthDay
        key={day.format('YYYY-MM-DD')}
        day={day}
        events={dayEvents}
      />,
    )
  }

  return (
    <>
      {emptyCells}
      {daysComponents}
    </>
  )
}
