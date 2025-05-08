import { useState } from 'react'
import moment, { Moment } from 'moment'
import { EventMinimize } from '../../../models/eventMinimize'
import { Modal } from '../../../components/UI/Modal/Modal'
import { EventMinimize as EventMinimizeComponent } from '../../../components/EventMinimize/EventMinimize'
import { ButtonCalendar } from '../../../components/UI/ButtonCalendar/ButtonCalendar'
import classNames from 'classnames'
import { PlaceOffline, PlaceOnline } from '../../../models/event'
import './CalendarMonthDay.scss'

export interface CalendarMonthDayProps {
  day: Moment
  events: EventMinimize[]
}

export const CalendarMonthDay = ({ day, events }: CalendarMonthDayProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isToday = moment().isSame(day, 'day')
  const hasEvents = events.length > 0
  const isWeekend = day.day() === 0 || day.day() === 6

  const handleClick = () => {
    if (hasEvents) setIsModalOpen(true)
  }

  return (
    <>
      <div
        className={'calendarMonthDay'}
        onClick={handleClick}
        style={{ cursor: hasEvents ? 'pointer' : 'default' }}
      >
        <ButtonCalendar
          className={classNames(
            'body_m_r',
            hasEvents ? ' calendarMonthDay--has-events' : '',
            isToday ? ' calendarMonthDay--today' : '',
          )}
          colorType={
            isToday
              ? 'today'
              : hasEvents
                ? 'event'
                : isWeekend
                  ? 'weekend'
                  : 'weekday'
          }
          text={day.date()}
        />

        {hasEvents && (
          <span className="calendarMonthDay__dot">
            {events.length > 1 ? events.length : ''}
          </span>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title={`Мероприятия на ${day.format('D MMMM YYYY')}`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="calendarPage-modal__events-list">
            {events.map(event => {
              const onlinePlace: PlaceOnline | null =
                event.places?.find(place => place.is_online) ?? null
              const offlinePlace: PlaceOffline | null =
                event.places?.find(place => !place.is_online) ?? null

              return (
                <EventMinimizeComponent
                  id={event.id}
                  date={event.date ?? null}
                  status={event.status.name}
                  name={event.name ?? ''}
                  type={event.type?.name ?? ''}
                  departmentName={event.department.name}
                  address={offlinePlace?.address ?? ''}
                  platform={onlinePlace?.platform ?? ''}
                  imageUrl={event.image?.url ?? ''}
                />
              )
            })}
          </div>
        </Modal>
      )}
    </>
  )
}
