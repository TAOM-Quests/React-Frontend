import moment, { Moment } from 'moment'
import { useEffect, useState } from 'react'
import { EventMinimize } from '../../models/eventMinimize'
import { events as eventsApi } from '../../services/api/eventModule/events/events'
import { CalendarFilter } from './CalendarFilter/CalendarFilter'
import { Loading } from '../../components/Loading/Loading'
import './EventCalendar.scss'
import { YearView } from './CalendarView/YearView'
import { MonthView } from './CalendarView/MonthView'

export interface EventsFilter {
  type?: number
  department?: number
}

export const EventCalendar = () => {
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month')
  const [filter, setFilter] = useState<EventsFilter>({})
  const [events, setEvents] = useState<EventMinimize[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedPeriod, setSelectedPeriod] = useState<Moment>(
    moment().set('day', 1),
  )

  useEffect(() => {
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

  return (
    <>
      <div className="calendarPage">
        <div className="calendarPage__filter-container">
          <CalendarFilter
            setFilter={(addFilter: EventsFilter) =>
              setFilter({ ...filter, ...addFilter })
            }
            selectedType={filter.type}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            selectedDepartment={filter.department}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
        <div className="calendarPage__days-container">
          {!isLoading ? (
            <>
              {viewMode === 'month' && (
                <MonthView events={events} month={selectedPeriod} />
              )}
              {viewMode === 'year' && (
                <YearView year={selectedPeriod} events={events} />
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  )
}
