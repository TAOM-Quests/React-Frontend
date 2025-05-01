import moment from 'moment'
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
  EventUpdateDto,
} from './eventsDto'

export const events = {
  getManyByParams: (params: EventsGetDto): Promise<EventMinimize[]> => {
    let queryString = Object.entries(params)
      .map(
        ([key, value]) =>
          `${key}=${value instanceof Date ? moment(value).format('YYYY-MM-DD') : value}`,
      )
      .join('&')

    return eventModule<EventMinimize[], null>(
      `events${queryString ? `?${queryString}` : ''}`,
    )
  },

  getOne: (params: EventGetDto): Promise<Event> =>
    eventModule<Event, null>(`events/${params.id}`),

  create: (params: EventCreateDto): Promise<Event> =>
    eventModule<Event, EventCreateDto>('events', params),

  update: (id: number, params: EventUpdateDto): Promise<Event> =>
    eventModule<Event, EventUpdateDto>(`events/${id}`, params),

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
