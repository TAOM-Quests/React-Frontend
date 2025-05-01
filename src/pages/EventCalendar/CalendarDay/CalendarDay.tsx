import { last } from 'lodash'
import { EventMinimize } from '../../../models/eventMinimize'
import moment from 'moment'

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
  const getEventTime = (event: EventMinimize): string => {
    const startTime = event.schedule[0]?.timeStart
    const endTime = last(event.schedule)?.timeEnd

    return startTime && endTime
      ? `${moment(startTime).format('HH:mm')} - ${moment(endTime).format('HH:mm')}`
      : ''
  }

  const renderOneEvent = (event: EventMinimize) => (
    <div>
      <img src={event.image?.url} />
      {getEventTime(event)}
      {event.name}
    </div>
  )

  const renderFewEvents = (events: EventMinimize[]): JSX.Element => (
    <>
      {events.map(event => (
        <div key={event.id}>
          {`${getEventTime(event)} ${event.name}`.trim()}
        </div>
      ))}
    </>
  )

  return (
    <div>
      <div>
        {dayNumber}
        {isToday && 'Сегодня'}
      </div>
      {events.length > 1 && renderFewEvents(events)}
      {events.length === 1 && renderOneEvent(events[0])}
    </div>
  )
}
