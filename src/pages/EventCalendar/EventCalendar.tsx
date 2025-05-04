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
import { CalendarMonthDay } from './CalendarMonthDay/CalendarMonthDay'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'
import './EventCalendar.scss'

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
    const firstDayOfMonth = selectedPeriod.clone().date(1)

    let weekDayIndex = firstDayOfMonth.isoWeekday()

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
      const day = selectedPeriod.clone().date(i)

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

  const renderYear = (): ReactNode => {
    const months = []
    const yearStart = selectedPeriod.clone().startOf('year')

    for (let month = 0; month < 12; month++) {
      const monthMoment = yearStart.clone().month(month)
      months.push(
        <ContainerBox key={month} className="calendarPage__month">
          <div className="body_l_sb   calendarPage__month-title">
            {monthMoment.format('MMMM')}
          </div>
          <div className="calendarPage__calendarMonthDay">
            <div className="body_s_sb  calendarPage__weekdays--mini">
              <div>ПН</div>
              <div>ВТ</div>
              <div>СР</div>
              <div>ЧТ</div>
              <div>ПТ</div>
              <div>СБ</div>
              <div>ВС</div>
            </div>
            <div className="body_m_r calendarPage__days-grid calendarPage__days-grid--mini">
              {renderMonthDays(monthMoment)}
            </div>
          </div>
        </ContainerBox>,
      )
    }

    return <div className="calendarPage__year-grid">{months}</div>
  }

  const renderMonthDays = (monthMoment: Moment): ReactNode => {
    const daysInMonth = monthMoment.daysInMonth()
    const firstDayOfMonth = monthMoment.clone().date(1)
    let weekDayIndex = firstDayOfMonth.isoWeekday()
    const emptyCells = []
    for (let i = 1; i < weekDayIndex; i++) {
      emptyCells.push(
        <div
          key={`empty-${i}`}
          className="calendarMonthDay calendarMonthDay--empty"
        />,
      )
    }
    const daysComponents: JSX.Element[] = []
    for (let i = 1; i <= daysInMonth; i++) {
      const day = monthMoment.clone().date(i)
      const dayEvents = events.filter(event =>
        moment(event.date).isSame(day, 'day'),
      )
      daysComponents.push(
        <CalendarMonthDay
          key={day.format('YYYY-MM-DD')}
          day={day}
          events={dayEvents}
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

  return (
    <>
      <div className="calendarPage">
        <div className="calendarPage__filter-container">
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
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
        <div className="calendarPage__days-container">
          {viewMode === 'month' ? (
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
                <div className="calendarPage__days-grid">{renderDays()}</div>
              ) : (
                <Loading />
              )}
            </>
          ) : !isLoading ? (
            renderYear()
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  )
}
