import { PlaceOffline, PlaceOnline } from './event'
import { EventStatus } from './eventStatus'
import { EventType } from './eventType'
import { ServerFile } from './serverFile'

export interface EventMinimize {
  id: number
  status: EventStatus
  date?: Date
  name?: string
  type?: EventType,
  places?: (PlaceOffline | PlaceOnline)[],
  image?: ServerFile
}
