import { EventTag } from '../../../../models/eventTag'
import { EventType } from '../../../../models/eventType'
import { Employee } from '../../../../models/user'
import { events } from '../../../../services/api/eventModule/events/events'
import { users } from '../../../../services/api/userModule/users/users'
import { user } from '../../../Profile/EventsTab/test/eventsTabEnvironment'

export interface FetchCreateEventDataProps {
  setEventTags: React.Dispatch<React.SetStateAction<EventTag[]>>
  setEventTypes: React.Dispatch<React.SetStateAction<EventType[]>>
  setEventExecutors: React.Dispatch<React.SetStateAction<Employee[]>>
}

export const fetchCreateEventData = async (
  departmentId: number,
  { setEventTags, setEventTypes, setEventExecutors }: FetchCreateEventDataProps,
) => {
  try {
    if (!user) throw new Error('User not found')

    setEventTags(await events.getTags(departmentId))
    setEventTypes(await events.getTypes())
    setEventExecutors(await users.getEmployees())
  } catch (e) {
    console.log(`[EventCreate - fetchCreateEventData] ${e}`)
  }
}
