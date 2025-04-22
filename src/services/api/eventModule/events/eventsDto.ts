import {
  PlaceOffline,
  PlaceOnline,
  ScheduleItem,
} from '../../../../models/event'

export interface EventsGetDto {
  date?: Date
  type?: number
  executor?: number
  department?: number
  participant?: number
}

export interface EventGetDto {
  id: number
}

export interface EventCreateDto {
  departmentId: number
  date?: Date
  name?: string
  typeId?: number
  imageId?: number
  statusId?: number
  filesIds?: number[]
  description?: string
  inspectorId?: number
  seatsNumber?: number
  executorsIds?: number[]
  schedule?: ScheduleItem[]
  places?: (PlaceOnline | PlaceOffline)[]
}

export interface EventUpdateDto {
  date?: Date
  name?: string
  typeId?: number
  imageId?: number
  statusId?: number
  filesIds?: number[]
  description?: string
  inspectorId?: number
  seatsNumber?: number
  executorsIds?: number[]
  schedule?: ScheduleItem[]
  places?: (PlaceOnline | PlaceOffline)[]
}
