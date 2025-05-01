import moment from 'moment'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { ScheduleItem } from '../../../models/event'
import { FadeInWrapper } from '../../../components/FadeInWrapper/FadeInWrapper'
import './EventSchedule.scss'

export interface EventScheduleProps {
  schedule: ScheduleItem[]
}

export const EventSchedule = ({ schedule }: EventScheduleProps) => {
  return (
    <ContainerBox className="event-schedule__container">
      <h5 className="heading_5 event-schedule__title">Регламент</h5>
      <div className="event-schedule__timeline">
        {schedule.map((item, idx) => (
          <FadeInWrapper>
            <div key={idx} className="event-schedule__item">
              <div className="event-schedule__circle" />
              {idx !== schedule.length - 1 && (
                <div className="event-schedule__line" />
              )}

              <div className="event-schedule__content">
                <div className="body_xl_m event-schedule__time">
                  {moment(item.timeStart).format('HH:mm')} -{' '}
                  {moment(item.timeEnd).format('HH:mm')}
                </div>

                {item.name && (
                  <div className="body_m_r event-schedule__desc">
                    {item.name}
                  </div>
                )}
              </div>
            </div>
          </FadeInWrapper>
        ))}
      </div>
    </ContainerBox>
  )
}
