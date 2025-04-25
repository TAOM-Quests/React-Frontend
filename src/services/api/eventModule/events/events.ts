import { Event } from '../../../../models/event'
import { EventMinimize } from '../../../../models/eventMinimize'
import { EventStatus } from '../../../../models/eventStatus'
import { EventType } from '../../../../models/eventType'
import { eventModule } from '../eventModule'
import {
  changeParticipantDto,
  EventCreateDto,
  EventGetDto,
  EventsGetDto,
} from './eventsDto'

export const events = {
  getManyByParams: (params: EventsGetDto): Promise<EventMinimize[]> =>
    eventModule<EventMinimize[], EventsGetDto>(
      `events${Object.values(params).length ? '?' : ''}` +
        Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&'),
    ),

  getOne: (params: EventGetDto): Promise<Event> =>
    eventModule<Event, EventGetDto>(`events/${params.id}`),

  create: (params: EventCreateDto): Promise<Event> =>
    eventModule<Event, EventCreateDto>('events', params),

  getTypes: (): Promise<EventType[]> => eventModule<EventType[], null>('types'),

  getStatuses: (): Promise<EventStatus[]> =>
    eventModule<EventStatus[], null>('statuses'),

  changeParticipant: (
    eventId: number,
    changeParticipant: changeParticipantDto,
  ): Promise<void> =>
    eventModule<void, changeParticipantDto>(
      `events/${eventId}/participants`,
      changeParticipant,
    ),
}
