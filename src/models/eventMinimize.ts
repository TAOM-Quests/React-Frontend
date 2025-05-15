import { Department } from './department'
import { PlaceOffline, PlaceOnline, ScheduleItem } from './event'
import { EventStatus } from './eventStatus'
import { EventTag } from './eventTag'
import { EventType } from './eventType'
import { ServerFile } from './serverFile'

export interface EventMinimize {
  id: number
  tags: EventTag[]
  status: EventStatus
  department: Department
  schedule: ScheduleItem[]
  participantsCount: number
  date?: Date
  name?: string
  type?: EventType
  image?: ServerFile
  places?: (PlaceOffline | PlaceOnline)[]
}
