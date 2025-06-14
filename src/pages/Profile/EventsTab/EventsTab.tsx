import { useEffect, useRef, useState } from 'react'
import { EmployeeAuth, UserAuth } from '../../../models/userAuth'
import { events } from '../../../services/api/eventModule/events/events'
import {
  EventMinimizeProps,
  EventMinimize as EventMinimizeComponent,
} from '../../../components/EventMinimize/EventMinimize'
import { EventMinimize } from '../../../models/eventMinimize'
import Input from '../../../components/UI/Input/Input'
import { PlaceOffline, PlaceOnline } from '../../../models/event'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import './EventsTab.scss'
import { Button } from '../../../components/UI/Button/Button'
import { useNavigate } from 'react-router'
import { EventType } from '../../../models/eventType'
import { EventStatus } from '../../../models/eventStatus'
import { Loading } from '../../../components/Loading/Loading'

import { Switcher } from '../../../components/UI/Switcher/Switcher'
import { isArray } from 'lodash'

const TABS = ['Мероприятия', 'Проверка мероприятий']
const EVENTS_COUNT_ON_SCREEN = 12
const STATUS_ID_WAIT_INSPECTION = 2
const ROLE_ID_INSPECTOR = 2

interface EventsFilter {
  name?: string
  type?: number
  status?: number
  executor?: number
  participant?: number
}

export interface EventsTabProps {
  user: UserAuth
}

export default function EventsTab({ user }: EventsTabProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([])

  const [tab, setTab] = useState<string>('Мероприятия')
  const [filter, setFilter] = useState<EventsFilter>(
    user.isEmployee ? { executor: user.id } : { participant: user.id },
  )
  const [userEvents, setEvents] = useState<EventMinimize[]>([])

  const [isEndOfEventsList, setIsEndOfEventsList] = useState(false)
  const [isAllEventsLoaded, setIsAllEventsLoaded] = useState(false)

  const navigate = useNavigate()
  const eventsListEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(true)
    tryCallback(fetchFilterData)
    tryCallback(setEventsListObserver)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (
      isEndOfEventsList &&
      !isAllEventsLoaded &&
      userEvents.length >= EVENTS_COUNT_ON_SCREEN
    ) {
      tryCallback(fetchEvents)
    }
  }, [isEndOfEventsList])

  useEffect(() => {
    setIsLoading(true)
    setEvents([])
    setIsAllEventsLoaded(false)
    tryCallback(() => fetchEvents(0))
    setIsLoading(false)
  }, [filter])

  const tryCallback = (callback: () => void) => {
    try {
      callback()
    } catch (e) {
      console.log(`[EventsTab] ${e}`)
    }
  }

  const setEventsListObserver = () => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsEndOfEventsList(entry.isIntersecting),
      { threshold: 0.1 },
    )

    if (eventsListEndRef.current) {
      observer.observe(eventsListEndRef.current)
    }

    return () => observer.disconnect()
  }

  const fetchFilterData = async () => {
    setEventTypes(await events.getTypes())
    setEventStatuses(await events.getStatuses())
  }

  const fetchEvents = async (offset?: number) => {
    const fetchedEvents = await events.getManyByParams({
      offset: offset ?? userEvents.length,
      limit: EVENTS_COUNT_ON_SCREEN,
      ...filter,
    })

    if (fetchedEvents.length < EVENTS_COUNT_ON_SCREEN) {
      setIsAllEventsLoaded(true)
    }

    setEvents(prevEvent => [...prevEvent, ...fetchedEvents])
  }

  const changeTab = (option: string) => {
    setTab(option)

    if (option === 'Мероприятия') {
      setFilter(({ status, ...prev }) => ({ ...prev, executor: user.id }))
    } else if (option === 'Проверка мероприятий') {
      setFilter(({ executor, ...prev }) => ({
        ...prev,
        status: STATUS_ID_WAIT_INSPECTION,
      }))
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          <div className="profile_events--tabs">
            {(user as EmployeeAuth).roleId === ROLE_ID_INSPECTOR && (
              <Switcher
                options={TABS}
                activeOption={tab}
                onChange={option => changeTab(option)}
              />
            )}
          </div>

          <div className="profile_events">
            <div className="profile_events--filters">
              <Input
                value={filter.name}
                iconBefore="SEARCH"
                placeholder="Поиск по названию"
                onChange={e =>
                  setFilter(state => ({ ...state, name: e.target.value }))
                }
              />
              <Dropdown
                items={eventTypes.map(type => ({
                  id: type.id,
                  text: type.name,
                }))}
                placeholder="Тип мероприятия"
                onChangeDropdown={selected =>
                  setFilter(state =>
                    !isArray(selected)
                      ? { ...state, type: selected?.id }
                      : state,
                  )
                }
              />
              {user.isEmployee && (
                <>
                  <Dropdown
                    items={eventStatuses.map(status => ({
                      id: status.id,
                      text: status.name,
                    }))}
                    placeholder="Статус"
                    onChangeDropdown={selected =>
                      setFilter(state =>
                        !isArray(selected)
                          ? { ...state, status: selected?.id }
                          : state,
                      )
                    }
                  />
                  <Button
                    onClick={() => navigate('/event/create')}
                    text="Создать мероприятие"
                    colorType="primary"
                  />
                </>
              )}
            </div>
            <div className="profile_events--events">
              {userEvents && userEvents.length
                ? userEvents.map(event => {
                    const onlinePlace: PlaceOnline | null =
                      event.places?.find(place => place.is_online) ?? null
                    const offlinePlace: PlaceOffline | null =
                      event.places?.find(place => !place.is_online) ?? null

                    const eventData: EventMinimizeProps = {
                      id: event.id,
                      date: event.date ?? null,
                      status: event.status.name,
                      name: event.name ?? '',
                      type: event.type?.name ?? '',
                      tags: event.tags?.map(tag => tag.name) ?? [],
                      imageUrl: event.image?.url ?? '',
                      address: offlinePlace?.address ?? '',
                      platform: onlinePlace?.platform ?? '',
                      departmentName: event.department?.name,
                      participantsCount: event.participantsCount,
                    }

                    if (
                      event.status.id === STATUS_ID_WAIT_INSPECTION &&
                      (user as EmployeeAuth).roleId === ROLE_ID_INSPECTOR
                    ) {
                      eventData.isInspectorView = true
                    } else if (user.isEmployee) {
                      eventData.isEmployeeView = true
                      eventData.onDelete = () =>
                        setEvents(userEvents.filter(e => e.id !== event.id))
                    }

                    return (
                      <EventMinimizeComponent key={event.id} {...eventData} />
                    )
                  })
                : 'Мероприятий нет'}
            </div>
            <div ref={eventsListEndRef} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
