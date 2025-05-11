import moment from 'moment'
import { PlaceOnline, PlaceOffline, ScheduleItem } from '../../../models/event'
import { events } from '../../../services/api/eventModule/events/events'
import { EventUpdateDto } from '../../../services/api/eventModule/events/eventsDto'
import { user } from '../../Profile/EventsTab/test/eventsTabEnvironment'
import {
  fetchCreateEventData,
  FetchCreateEventDataProps,
} from './fetchCreateEventData'
import { fetchEventData, FetchEventProps } from './fetchEventData'
import { EventTag } from '../../../models/eventTag'
import { EventType } from '../../../models/eventType'
import { ServerFile } from '../../../models/serverFile'
import { Employee } from '../../../models/user'
import { useNavigate } from 'react-router'

export interface SaveEventProps {
  name: string
  time: string
  address: string
  platform: string
  date: Date | null
  accessCode: string
  identifier: string
  recordLink: string
  files: ServerFile[]
  description: string
  floor: number | null
  officeNumber: string
  executors: Employee[]
  connectionLink: string
  type: EventType | null
  schedule: ScheduleItem[]
  image: ServerFile | null
  seatsNumber: number | null
  additionalInfoTexts: string[]
  tags: (EventTag & { isUserAdded?: boolean })[]
}

export const saveEvent = async (
  eventId: number | undefined,
  departmentId: number,
  ADDITIONAL_INFO_SEPARATOR: string,
  setEventState: FetchEventProps,
  setCreateEventState: FetchCreateEventDataProps,
  {
    date,
    name,
    tags,
    time,
    type,
    files,
    floor,
    image,
    address,
    platform,
    schedule,
    executors,
    accessCode,
    identifier,
    recordLink,
    description,
    seatsNumber,
    officeNumber,
    connectionLink,
    additionalInfoTexts,
  }: SaveEventProps,
) => {
  try {
    if (!user) throw new Error('User not authenticated')

    const navigate = useNavigate()

    const eventUpdate: EventUpdateDto = {
      name,
      date: date
        ? moment(date)
            .set('hour', +time.split(':')[0])
            .set('minute', +time.split(':')[1])
            .toDate()
        : undefined,
      typeId: type?.id,
      description:
        description +
        `
          ${ADDITIONAL_INFO_SEPARATOR}
          ${additionalInfoTexts.join('<br>')}
        `,
      seatsNumber: seatsNumber ?? undefined,
      places: getPlaces({
        address,
        floor,
        officeNumber,
        platform,
        connectionLink,
        recordLink,
        identifier,
        accessCode,
      } as SaveEventProps),
      schedule,
      executorsIds: executors.map(executor => executor.id),
      imageId: image?.id ?? null,
      filesIds: files.map(file => file.id),
      tags: [
        ...tags.filter(tag => tag.isUserAdded).map(tag => ({ name: tag.name })),
        ...tags
          .filter(tag => !tag.isUserAdded)
          .map(tag => ({ id: tag.id, name: tag.name })),
      ],
    }

    if (
      eventUpdate.executorsIds &&
      !eventUpdate.executorsIds.includes(user.id)
    ) {
      eventUpdate.executorsIds.push(user.id)
    }

    if (!eventId) {
      const event = await events.create({
        ...eventUpdate,
        departmentId,
      })

      if (!window.location.pathname.includes(`${event.id}`)) {
        navigate(`/event/${event.id}/edit`)
      }
    } else {
      await events.update(+eventId, eventUpdate)
      await fetchCreateEventData(departmentId, setCreateEventState)
      await fetchEventData(+eventId, ADDITIONAL_INFO_SEPARATOR, setEventState)
    }
  } catch (e) {
    console.log(`[EventCreate - saveEvent] ${e}`)
  }
}

const getPlaces = ({
  address,
  floor,
  officeNumber,
  platform,
  connectionLink,
  recordLink,
  identifier,
  accessCode,
}: SaveEventProps): (PlaceOnline | PlaceOffline)[] => {
  const places: (PlaceOnline | PlaceOffline)[] = []

  if (address || floor || officeNumber) {
    const offlinePlace: PlaceOffline = {
      is_online: false,
    }

    if (address) offlinePlace.address = address
    if (floor) offlinePlace.floor = floor
    if (officeNumber) offlinePlace.office_number = officeNumber

    places.push(offlinePlace)
  }

  if (platform || connectionLink || recordLink || identifier || accessCode) {
    const onlinePlace: PlaceOnline = {
      is_online: true,
    }

    if (platform) onlinePlace.platform = platform
    if (connectionLink) onlinePlace.connection_link = connectionLink
    if (recordLink) onlinePlace.record_link = recordLink
    if (identifier) onlinePlace.identifier = identifier
    if (accessCode) onlinePlace.access_code = accessCode

    places.push(onlinePlace)
  }

  return places
}
