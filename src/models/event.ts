import { EventStatus } from './eventStatus'
import { EventType } from './eventType'
import { ServerFile } from './serverFile'
import { Employee } from './user'

export interface Event {
  id: number
  name: string
  image: ServerFile
  description: string
  date: Date
  seatsNumber: number
  inspector: Employee
  executors: Employee[]
  places: (PlaceOnline | PlaceOffline)[]
  schedule: ScheduleItem[]
  type: EventType
  status: EventStatus
  files: ServerFile[]
}

interface Place {
  is_online: boolean
}

export interface PlaceOnline extends Place {
  platform?: string
  identifier?: string
  access_code?: string
  connection_link?: string
  record_link?: string
}

export interface PlaceOffline extends Place {
  floor?: number
  address?: string
  office_number?: string
}

export interface ScheduleItem {
  name: string
  timeEnd: Date
  timeStart: Date
}
