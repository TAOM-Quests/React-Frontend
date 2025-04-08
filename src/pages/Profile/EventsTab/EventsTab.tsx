import { useEffect, useState } from 'react'
import { UserAuth } from '../../../models/userAuth'
import { events } from '../../../services/api/eventModule/events/events'
import EventMinimizeComponent, {
  EventMinimizeProps,
} from '../../../components/EventMinimize/EventMinimize'
import { EventMinimize } from '../../../models/eventMinimize'
import Input from '../../../components/Input/Input'

interface EventsFilter {
  name?: string
  type?: number
  status?: number
}

export interface EventsTabProps {
  user: UserAuth
}

export default function EventsTab({ user }: EventsTabProps) {
  const [filter, setFilter] = useState<EventsFilter>({})
  const [userEvents, setEvents] = useState<EventMinimize[] | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents(
        user.roleId
          ? await events.getManyByParams({ executor: user.id, ...filter })
          : await events.getManyByParams({ participant: user.id, ...filter }),
      )
    }

    fetchEvents()
  }, [filter])

  return (
    <div>
      <Input
        placeholder="Поиск по названию"
        onChange={e => setFilter(state => ({ ...state, name: e.target.value }))}
      />
      <Input
        type="number"
        placeholder="Поиск по типу"
        onChange={e =>
          setFilter(state => ({ ...state, type: +e.target.value }))
        }
      />
      <Input
        type="number"
        placeholder="Поиск по статусу"
        onChange={e =>
          setFilter(state => ({ ...state, status: +e.target.value }))
        }
      />

      {userEvents && userEvents.length
        ? userEvents.map(event => {
            const eventData: EventMinimizeProps = {
              id: event.id,
              status: event.status.name,
              name: event.name ?? '',
              type: event.type?.name ?? '',
              address: event.address ?? '',
              onlineMeeting: event.onlineMeeting ?? '',
            }

            if (user.roleId) eventData.isEmployeeView = true

            return <EventMinimizeComponent key={event.id} {...eventData} />
          })
        : 'Мероприятий нет'}
    </div>
  )
}
