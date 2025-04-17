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
  platform?: string
  identifier?: string
  accessCode?: string
  connectionLink?: string
  recordLink?: string
}

export interface PlaceOffline extends Place {
  floor?: number
  address?: string
  officeNumber?: string
}

export interface ScheduleItem {
  name: string
  timeEnd: Date
  timeStart: Date
}
