import moment, { Moment } from 'moment'
import { ReactNode, useEffect, useState } from 'react'
import { EventMinimize } from '../../models/eventMinimize'
import { events as eventsApi } from '../../services/api/eventModule/events/events'
import { Department } from '../../models/department'
import { EventType } from '../../models/eventType'
import { CalendarFilter } from './CalendarFilter/CalendarFilter'
import { CalendarDay } from './CalendarDay/CalendarDay'
import { commonEntities } from '../../services/api/commonModule/commonEntities/commonEntities'
import { Loading } from '../../components/Loading/Loading'
export interface EventsFilter {
  type?: number
  department?: number
}

export const EventCalendar = () => {
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month')
  const [filter, setFilter] = useState<EventsFilter>({})
  const [events, setEvents] = useState<EventMinimize[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [eventDepartments, setEventDepartments] = useState<Department[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<Moment>(
    moment().set('day', 1),
  )

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setIsLoading(true)

        const eventTypes = await eventsApi.getTypes()
        const eventDepartments = await commonEntities.getDepartments()

        setEventTypes(eventTypes)
        setEventDepartments(eventDepartments)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchFilterData()
  }, [])

  useEffect(() => {
    console.log('filter', filter)

    const fetchEvents = async () => {
      try {
        setIsLoading(true)

        const events = await eventsApi.getManyByParams({
          dateStart: selectedPeriod.startOf('month').toDate(),
          dateEnd: selectedPeriod.endOf('month').toDate(),
          ...filter,
        })

        setEvents(events)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchEvents()
  }, [filter, selectedPeriod])

  const renderDays = (): ReactNode => {
    const daysInMonth = selectedPeriod.daysInMonth()
    const daysComponents: JSX.Element[] = []

    for (let i = 1; i <= daysInMonth; i++) {
      const day = selectedPeriod.clone().date(i)

      daysComponents.push(
        <CalendarDay
          key={day.format('YYYY-MM-DD')}
          dayNumber={i}
          events={events.filter(
            event =>
              moment(event.date).format('YYYY-MM-DD') ===
              day.format('YYYY-MM-DD'),
          )}
          isToday={moment().isSame(day, 'day')}
        />,
      )
    }

    return <>{daysComponents}</>
  }

  return (
    <>
      {!isLoading ? (
        <>
          <div>
            <CalendarFilter
              types={eventTypes}
              setFilter={(addFilter: EventsFilter) =>
                setFilter({ ...filter, ...addFilter })
              }
              selectedType={filter.type}
              departments={eventDepartments}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              selectedDepartment={filter.department}
            />
          </div>
          <div>{renderDays()}</div>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
