import { EventStatus } from './eventStatus'
import { EventType } from './eventType'

export interface EventMinimize {
  id: number
  status: EventStatus
  date?: Date
  name?: string
  address?: string
  type?: EventType
  onlineMeeting?: string
}
