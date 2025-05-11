import moment from 'moment'
import { PlaceOffline, PlaceOnline, ScheduleItem } from '../../../models/event'
import { events } from '../../../services/api/eventModule/events/events'
import { Dispatch } from 'react'
import { EventTag } from '../../../models/eventTag'
import { EventType } from '../../../models/eventType'
import { ServerFile } from '../../../models/serverFile'
import { Employee } from '../../../models/user'

export interface FetchEventProps {
  setName: Dispatch<React.SetStateAction<string>>
  setTime: Dispatch<React.SetStateAction<string>>
  setAddress: Dispatch<React.SetStateAction<string>>
  setPlatform: Dispatch<React.SetStateAction<string>>
  setTags: Dispatch<React.SetStateAction<EventTag[]>>
  setDate: Dispatch<React.SetStateAction<Date | null>>
  setAccessCode: Dispatch<React.SetStateAction<string>>
  setIdentifier: Dispatch<React.SetStateAction<string>>
  setRecordLink: Dispatch<React.SetStateAction<string>>
  setFiles: Dispatch<React.SetStateAction<ServerFile[]>>
  setDescription: Dispatch<React.SetStateAction<string>>
  setFloor: Dispatch<React.SetStateAction<number | null>>
  setOfficeNumber: Dispatch<React.SetStateAction<string>>
  setExecutors: Dispatch<React.SetStateAction<Employee[]>>
  setType: Dispatch<React.SetStateAction<EventType | null>>
  setConnectionLink: Dispatch<React.SetStateAction<string>>
  setImage: Dispatch<React.SetStateAction<ServerFile | null>>
  setSchedule: Dispatch<React.SetStateAction<ScheduleItem[]>>
  setSeatsNumber: Dispatch<React.SetStateAction<number | null>>
  setAdditionalInfoTexts: Dispatch<React.SetStateAction<string[]>>
}

export const fetchEventData = async (
  id: number,
  ADDITIONAL_INFO_SEPARATOR: string,
  {
    setDate,
    setName,
    setTags,
    setTime,
    setType,
    setFiles,
    setFloor,
    setImage,
    setAddress,
    setPlatform,
    setSchedule,
    setExecutors,
    setAccessCode,
    setIdentifier,
    setRecordLink,
    setDescription,
    setSeatsNumber,
    setOfficeNumber,
    setConnectionLink,
    setAdditionalInfoTexts,
  }: FetchEventProps,
) => {
  try {
    const event = await events.getOne({ id })

    if (event.date) setDate(event.date)
    if (event.name) setName(event.name)
    if (event.type) setType(event.type)
    if (event.tags) setTags(event.tags)
    if (event.image) setImage(event.image)
    if (event.files) setFiles(event.files)
    if (event.status) setSchedule(event.schedule)
    if (event.executors) setExecutors(event.executors)
    if (event.description)
      setDescription(event.description.split(ADDITIONAL_INFO_SEPARATOR)[0])
    if (event.description)
      setAdditionalInfoTexts(
        event.description
          .split(ADDITIONAL_INFO_SEPARATOR)[1]
          .split('<br>')
          .map(item => item.trim()),
      )
    if (event.seatsNumber) setSeatsNumber(event.seatsNumber)
    if (event.date) setTime(moment(event.date).format('HH:mm'))

    const offlinePlace: PlaceOffline = event.places.find(
      place => !place.is_online,
    ) as PlaceOffline
    const onlinePlace: PlaceOnline = event.places.find(
      place => place.is_online,
    ) as PlaceOnline

    if (offlinePlace) {
      if (offlinePlace.floor) setFloor(offlinePlace.floor)
      if (offlinePlace.address) setAddress(offlinePlace.address)
      if (offlinePlace.office_number)
        setOfficeNumber(offlinePlace.office_number)
    }

    if (onlinePlace) {
      if (onlinePlace.platform) setPlatform(onlinePlace.platform)
      if (onlinePlace.connection_link)
        setConnectionLink(onlinePlace.connection_link)
      if (onlinePlace.record_link) setRecordLink(onlinePlace.record_link)
      if (onlinePlace.identifier) setIdentifier(onlinePlace.identifier)
      if (onlinePlace.access_code) setAccessCode(onlinePlace.access_code)
    }
  } catch (e) {
    console.log(`[EventCreate - fetchEventData] ${e}`)
  }
}
