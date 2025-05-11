import { Dispatch, useEffect, useState } from 'react'
import { UserAuth } from '../../../models/userAuth'
import { events } from '../../../services/api/eventModule/events/events'
import EventMinimizeComponent, {
  EventMinimizeProps,
} from '../../../components/EventMinimize/EventMinimize'
import { EventMinimize } from '../../../models/eventMinimize'
import Input from '../../../components/UI/Input/Input'
import { PlaceOffline, PlaceOnline } from '../../../models/event'
import {
  Dropdown,
  DropdownItemType,
} from '../../../components/UI/Dropdown/Dropdown'
import './EventsTab.scss'
import { Button } from '../../../components/UI/Button/Button'
import { useNavigate } from 'react-router'
import { ScrollController } from '../../../components/ScrollController/ScrollController'
import { EventType } from '../../../models/eventType'
import { EventStatus } from '../../../models/eventStatus'
import { isArray } from 'lodash'
import { Loading } from '../../../components/Loading/Loading'

interface EventsFilter {
  name?: string
  type?: number
  status?: number
}

export interface EventsTabProps {
  user: UserAuth
}

export default function EventsTab({ user }: EventsTabProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([])

  const [filter, setFilter] = useState<EventsFilter>({})
  const [userEvents, setEvents] = useState<EventMinimize[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    fetchFilterData()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setEvents([])
    fetchEvents()
    setIsLoading(false)
  }, [filter])

  const fetchFilterData = async () => {
    try {
      setEventTypes(await events.getTypes())
      setEventStatuses(await events.getStatuses())
    } catch (e) {
      console.log(`[EventsTab] ${e}`)
    }
  }

  const fetchEvents = async () => {
    const fetchedEvents = user.isEmployee
      ? await events.getManyByParams({
          executor: user.id,
          offset: userEvents?.length,
          ...filter,
        })
      : await events.getManyByParams({
          participant: user.id,
          offset: userEvents?.length,
          ...filter,
        })

    setEvents([...(userEvents ?? []), ...fetchedEvents])
  }

  return (
    <>
      {!isLoading ? (
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
                  !isArray(selected) && selected
                    ? { ...state, type: selected.id }
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
                      !isArray(selected) && selected
                        ? { ...state, status: selected.id }
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
          <ScrollController
            onEndScroll={fetchEvents}
            className="profile_events--events"
            style={{ overflow: 'scroll' }}
          >
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
                    address: offlinePlace?.address ?? '',
                    platform: onlinePlace?.platform ?? '',
                    imageUrl: event.image?.url ?? '',
                  }

                  if (user.isEmployee) {
                    eventData.isEmployeeView = true
                    eventData.onDelete = () =>
                      setEvents(userEvents.filter(e => e.id !== event.id))
                  }

                  return (
                    <EventMinimizeComponent key={event.id} {...eventData} />
                  )
                })
              : 'Мероприятий нет'}
          </ScrollController>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
