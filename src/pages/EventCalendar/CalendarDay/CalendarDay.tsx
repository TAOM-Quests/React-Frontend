import { last } from 'lodash'
import { EventMinimize } from '../../../models/eventMinimize'
import moment from 'moment'
import { Tag } from '../../../components/UI/Tag/Tag'
import { useEffect, useState } from 'react'
import { Modal } from '../../../components/UI/Modal/Modal'
import { useNavigate } from 'react-router'
import EventMinimizeComponent from '../../../components/EventMinimize/EventMinimize'
import { PlaceOffline, PlaceOnline } from '../../../models/event'

export interface CalendarDayProps {
  isToday: boolean
  dayNumber: number
  events: EventMinimize[]
}

export const CalendarDay = ({
  events,
  isToday,
  dayNumber,
}: CalendarDayProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  const openEventsModal = () => {
    setIsModalOpen(true)
  }

  const getEventTime = (event: EventMinimize): string => {
    const startTime = event.schedule[0]?.timeStart
    const endTime = last(event.schedule)?.timeEnd

    return startTime && endTime
      ? `${moment(startTime).format('HH:mm')} – ${moment(endTime).format('HH:mm')}`
      : ''
  }

  const renderOneEvent = (event: EventMinimize) => (
    <div className="calendarPage-day__single-event">
      <div className="calendarPage-day__event-content">
        <div className="body_m_sb calendarPage-day__event-time">
          {getEventTime(event)}
        </div>
        <div className="body_m_sb calendarPage-day__event-name">
          {event.name}
        </div>
      </div>
    </div>
  )

  const renderFewEvents = (events: EventMinimize[]): JSX.Element => (
    <div className="calendarPage-day__multiple-events">
      {events.slice(0, 2).map(event => (
        <div
          key={event.id}
          onClick={() => navigate(`/event/${event.id}`)}
          className="calendarPage-day__event-item"
        >
          <p className="body_m_sb calendarPage-day__event-item__title">
            {getEventTime(event)} {event.name}
          </p>
        </div>
      ))}
      <div className="calendarPage-day__event-item--more">
        {events.length > 2 && (
          <div
            className="body_m_sb calendarPage-day__event-item"
            onClick={() => openEventsModal()}
          >
            +{events.length - 2}
          </div>
        )}
      </div>
    </div>
  )

  const useIsMobile = (maxWidth = 720) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth)

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= maxWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [maxWidth])

    return isMobile
  }

  const isMobile = useIsMobile(720)

  return (
    <div
      className={`calendarPage-day ${isToday ? 'calendarPage-day--today' : ''} 
      ${events.length ? 'calendarPage-day--has-events' : ''}
      ${events.length === 1 ? 'calendarPage-day__single' : ''}
      ${events.length && isMobile ? 'calendarPage-day--mobile' : ''}
      
      
      `}
      onClick={
        events.length && events.length > 1 && isMobile
          ? () => openEventsModal()
          : undefined
      }
      style={
        events.length === 1
          ? {
              backgroundImage: `url(${events[0].image?.url})`,
            }
          : {}
      }
    >
      {events.length === 1 && (
        <div
          onClick={() => navigate(`/event/${events[0].id}`)}
          className="calendarPage-day__single-overlay"
        />
      )}

      <div className="calendarPage-day__header">
        <span className="body_m_sb calendarPage-day__number">{dayNumber}</span>
        {isToday && events.length === 1 && (
          <Tag text="Сегодня" type="primary" size="small" />
        )}
      </div>
      {events.length > 1 && renderFewEvents(events)}
      {events.length === 1 && renderOneEvent(events[0])}

      {isModalOpen && (
        <Modal
          title={`Мероприятия на ${dayNumber} число`}
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
                  address={offlinePlace?.address ?? ''}
                  platform={onlinePlace?.platform ?? ''}
                  imageUrl={event.image?.url ?? ''}
                />
              )
            })}
          </div>
        </Modal>
      )}
    </div>
  )
}
