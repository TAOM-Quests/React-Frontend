import { Comment } from './comment'
import { Department } from './department'
import { EventStatus } from './eventStatus'
import { EventTag } from './eventTag'
import { EventType } from './eventType'
import { ServerFile } from './serverFile'
import { Employee } from './user'

export interface Event {
  id: number
  date: Date
  name: string
  type: EventType
  tags: EventTag[]
  image: ServerFile
  description: string
  seatsNumber: number
  files: ServerFile[]
  inspector: Employee
  status: EventStatus
  executors: Employee[]
  department: Department
  schedule: ScheduleItem[]
  inspectorComments: Comment[]
  places: (PlaceOnline | PlaceOffline)[]
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
