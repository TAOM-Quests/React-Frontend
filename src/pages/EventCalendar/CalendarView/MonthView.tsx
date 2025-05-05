import { ReactNode } from 'react'
import moment, { Moment } from 'moment'
import { EventMinimize } from '../../../models/eventMinimize'
import { CalendarDay } from '../CalendarDay/CalendarDay'

interface MonthViewProps {
  month: Moment
  events: EventMinimize[]
}

export const MonthView = ({ month, events }: MonthViewProps): ReactNode => {
  const daysInMonth = month.daysInMonth()
  const firstDayOfMonth = month.clone().date(1)
  const weekDayIndex = firstDayOfMonth.isoWeekday()

  const emptyCells = []
  for (let i = 1; i < weekDayIndex; i++) {
    emptyCells.push(
      <div
        key={`empty-${i}`}
        className="calendarPage-day calendarPage-day--empty"
      />,
    )
  }

  const daysComponents: JSX.Element[] = []
  for (let i = 1; i <= daysInMonth; i++) {
    const day = month.clone().date(i)
    daysComponents.push(
      <CalendarDay
        key={day.format('YYYY-MM-DD')}
        day={day}
        events={events.filter(
          event =>
            moment(event.date).format('YYYY-MM-DD') ===
            day.format('YYYY-MM-DD'),
        )}
        isToday={moment().isSame(day, 'day')}
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
