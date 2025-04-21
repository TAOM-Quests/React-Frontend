import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
interface EventsFilter {
  name?: string
  type?: number
  status?: number
}

export interface EventsTabProps {
  user: UserAuth
}

export default function EventsTab({ user }: EventsTabProps) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<EventsFilter>({})
  const [userEvents, setEvents] = useState<EventMinimize[] | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents(
        user.isEmployee
          ? await events.getManyByParams({ executor: user.id, ...filter })
          : await events.getManyByParams({ participant: user.id, ...filter }),
      )
    }

    fetchEvents()
  }, [filter])

  const getUniqueDropdownItems = (
    events: EventMinimize[] | null,
    selector: (
      event: EventMinimize,
    ) => { id: number; name: string } | undefined,
  ): DropdownItemType[] => {
    if (!events) return []

    const uniqueMap = new Map<number, { id: number; name: string }>()

    events
      .filter(event => {
        const item = selector(event)
        return !!item && !!item.name
      })
      .forEach(event => {
        const item = selector(event)!
        if (!uniqueMap.has(item.id)) {
          uniqueMap.set(item.id, item)
        }
      })

    return Array.from(uniqueMap.values()).map(({ id, name }) => ({
      id,
      text: name,
    }))
  }

  const dropdownTypes = getUniqueDropdownItems(userEvents, e => e.type)

  const dropdownStatuses = getUniqueDropdownItems(userEvents, e => e.status)

  const createDropdownChangeHandler =
    (key: string, setFilter: Dispatch<React.SetStateAction<EventsFilter>>) =>
    (selectedItem: DropdownItemType | DropdownItemType[] | null) => {
      if (selectedItem === null) {
        setFilter(state => ({ ...state, [key]: undefined }))
        return
      }

      if (Array.isArray(selectedItem)) {
        const first = selectedItem[0]
        setFilter(state => ({ ...state, [key]: first?.id ?? undefined }))
      } else {
        setFilter(state => ({ ...state, [key]: selectedItem.id }))
      }
    }

  return (
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
          items={dropdownTypes}
          placeholder="Тип мероприятия"
          onChangeDropdown={createDropdownChangeHandler('type', setFilter)}
        />
        {user.isEmployee && (
          <>
            <Dropdown
              items={dropdownStatuses}
              placeholder="Статус"
              onChangeDropdown={createDropdownChangeHandler(
                'status',
                setFilter,
              )}
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
                address: offlinePlace?.address ?? '',
                platform: onlinePlace?.platform ?? '',
                imageUrl: event.image?.url ?? '',
              }

              if (user.isEmployee) eventData.isEmployeeView = true

              return <EventMinimizeComponent key={event.id} {...eventData} />
            })
          : 'Мероприятий нет'}
      </div>
    </div>
  )
}
