import { EventMinimize } from '../../../../models/eventMinimize'
import { EventStatus } from '../../../../models/eventStatus'
import { EventType } from '../../../../models/eventType'
import { eventModule } from '../eventModule'
import { EventGetDto, EventsGetDto } from './eventsDto'

export const events = {
  getManyByParams: (params: EventsGetDto): Promise<EventMinimize[]> =>
    eventModule<EventMinimize[], EventsGetDto>(
      `events${Object.values(params).length ? '?' : ''}` +
        Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&'),
    ),

  getOne: (params: EventGetDto): Promise<EventMinimize> =>
    eventModule<EventMinimize, EventGetDto>(`events/${params.id}`),

  create: (params: Event): Promise<Event> =>
    eventModule<Event, Event>('events', params),

  getTypes: (): Promise<EventType[]> => eventModule<EventType[], null>('types'),

  getStatuses: (): Promise<EventStatus[]> =>
    eventModule<EventStatus[], null>('statuses'),
}
