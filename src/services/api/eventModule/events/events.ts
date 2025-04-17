import { EventMinimize } from '../../../../models/eventMinimize'
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
}
