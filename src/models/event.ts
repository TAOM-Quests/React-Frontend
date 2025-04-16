import { EventStatus } from './eventStatus'
import { EventType } from './eventType'
import { Employee } from './user'

export interface Event {
  id: number
  name: string
  description: string
  date: Date
  seatsNumber: number
  inspector: Employee
  executors: Employee[]
  places: (PlaceOnline | PlaceOffline)[]
  schedule: ScheduleItem[]
  type: EventType
  status: EventStatus
}

interface Place {
  isOnline: boolean
}

export interface PlaceOnline extends Place {
  platform: string
  connectionLink: string
  identifier: string
  accessCode: string
  recordLink?: string
}

export interface PlaceOffline extends Place {
  address: string
  officeNumber: string
  floor: number
}

export interface ScheduleItem {
  name: string
  timeEnd: Date
  timeStart: Date
}
