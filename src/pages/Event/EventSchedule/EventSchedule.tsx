import moment from 'moment'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { ScheduleItem } from '../../../models/event'
import './EventSchedule.scss'

export interface EventScheduleProps {
  schedule: ScheduleItem[]
}

export const EventSchedule = ({ schedule }: EventScheduleProps) => {
  return (
    <ContainerBox className="event-schedule__container">
      <h2 className="event-schedule__title">Регламент</h2>
      <div className="event-schedule__timeline">
        {schedule.map((item, idx) => (
          <div key={idx} className="event-schedule__item">
            <div className="event-schedule__circle" />
            {idx !== schedule.length - 1 && (
              <div className="event-schedule__line" />
            )}
            <div className="event-schedule__content">
              <div className="event-schedule__time">
                {moment(item.timeStart).format('HH:mm')} -{' '}
                {moment(item.timeEnd).format('HH:mm')}
              </div>
              <div className="event-schedule__desc">{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </ContainerBox>
  )
}
