import { Moment } from 'moment'
import { EventMinimize } from '../../../models/eventMinimize'
import { MonthViewDays } from './MonthViewDays'

interface MonthViewProps {
  month: Moment
  events: EventMinimize[]
}
export const MonthView = ({ month, events }: MonthViewProps) => {
  return (
    <>
      <div className="calendarPage__weekdays">
        <div className="body_l_sb calendarPage__weekday">Пн</div>
        <div className="body_l_sb calendarPage__weekday">Вт</div>
        <div className="body_l_sb calendarPage__weekday">Ср</div>
        <div className="body_l_sb calendarPage__weekday">Чт</div>
        <div className="body_l_sb calendarPage__weekday">Пт</div>
        <div className="body_l_sb calendarPage__weekday">Сб</div>
        <div className="body_l_sb calendarPage__weekday">Вс</div>
      </div>
      <div className="calendarPage__days-grid">
        <MonthViewDays month={month} events={events} />
      </div>
    </>
  )
}
