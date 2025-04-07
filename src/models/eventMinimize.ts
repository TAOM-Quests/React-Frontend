import { EventStatus } from './eventStatus'

export interface EventMinimize {
  date: Date
  id: number
  name: string
  type: string
  address: string
  status: EventStatus
  onlineMeeting: string
}
