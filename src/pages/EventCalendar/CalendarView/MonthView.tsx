import { Moment } from 'moment'
import { EventMinimize } from '../../../models/eventMinimize'
import { Loading } from '../../../components/Loading/Loading'
import { MonthViewDays } from './MonthViewDays'

interface MonthViewProps {
  month: Moment
  events: EventMinimize[]
  isLoading?: boolean
}
export const MonthView = ({ month, events, isLoading }: MonthViewProps) => {
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
      {!isLoading ? (
        <div className="calendarPage__days-grid">
          <MonthViewDays month={month} events={events} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
