import { Department } from './department'
import { PlaceOffline, PlaceOnline, ScheduleItem } from './event'
import { EventStatus } from './eventStatus'
import { EventType } from './eventType'
import { ServerFile } from './serverFile'

export interface EventMinimize {
  id: number
  status: EventStatus
  department: Department
  schedule: ScheduleItem[]
  date?: Date
  name?: string
  type?: EventType
  image?: ServerFile
  places?: (PlaceOffline | PlaceOnline)[]
}
