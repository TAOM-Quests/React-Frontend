import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'
import { useNavigate, useParams } from 'react-router'
import { EventType } from '../../models/eventType'
import { Employee } from '../../models/user'
import { Button } from '../../components/UI/Button/Button'
import { EventStatus } from '../../models/eventStatus'
import { events } from '../../services/api/eventModule/events/events'
import Input from '../../components/UI/Input/Input'
import { Dropdown } from '../../components/UI/Dropdown/Dropdown'
import { users } from '../../services/api/userModule/users/users'
import { PlaceOffline, PlaceOnline, ScheduleItem } from '../../models/event'
import { EventCreateSchedule } from './EventCreateSchedule/EventCreateSchedule'
import { TextEditor } from '../../components/TextEditor/TextEditor'
import { EventCreateImage } from './EventCreateImage/EventCreateImage'
import { EventCreateFiles } from './EventCreateFiles/EventCreateFiles'
import { ServerFile } from '../../models/serverFile'
import { EventUpdateDto } from '../../services/api/eventModule/events/eventsDto'
import './EventCreate.scss'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'

export const EventCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [eventExecutors, setEventExecutors] = useState<Employee[]>([])
  const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([])
  const [image, setImage] = useState<ServerFile | null>(null)
  const [name, setName] = useState<string>('')
  // const [date, setDate] = useState<Date | null>(null)
  const [type, setType] = useState<EventType | null>(null)
  const [executors, setExecutors] = useState<Employee[]>([])
  const [seatsNumber, setSeatsNumber] = useState<number | null>(null)
  const [description, setDescription] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [floor, setFloor] = useState<number | null>(null)
  const [officeNumber, setOfficeNumber] = useState<string>('')
  const [platform, setPlatform] = useState<string>('')
  const [connectionLink, setConnectionLink] = useState<string>('')
  const [recordLink, setRecordLink] = useState<string>('')
  const [identifier, setIdentifier] = useState<string>('')
  const [accessCode, setAccessCode] = useState<string>('')
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [files, setFiles] = useState<ServerFile[]>([])

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)
  const eventId = useParams().id

  useEffect(() => {
    const fetchCreateEventData = async () => {
      try {
        setEventTypes(await events.getTypes())
        setEventStatuses(await events.getStatuses())
        setEventExecutors(await users.getEmployees())
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }

    const fetchEventData = async (id: number) => {
      try {
        const event = await events.getOne({ id })

        if (event.name) setName(event.name)
        //if (event.) setDate(event.date)
        if (event.type) setType(event.type)
        if (event.executors) setExecutors(event.executors)
        if (event.seatsNumber) setSeatsNumber(event.seatsNumber)
        if (event.description) setDescription(event.description)

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

        if (event.status) setSchedule(event.schedule)
        if (event.files) setFiles(event.files)
      } catch (e) {
        console.log(e)
      }
    }

    fetchCreateEventData()

    if (eventId) {
      fetchEventData(+eventId)
    }
  }, [])

  useEffect(() => {
    if (!user?.isEmployee) {
      navigate('/')
    }
  }, [user])

  const saveEvent = async () => {
    try {
      const eventUpdate: EventUpdateDto = {}

      if (name) eventUpdate.name = name
      if (type) eventUpdate.typeId = type.id
      if (description) eventUpdate.description = description
      if (seatsNumber) eventUpdate.seatsNumber = seatsNumber
      if (getPlaces().length) eventUpdate.places = getPlaces()
      if (schedule.length) eventUpdate.schedule = schedule
      if (executors.length) {
        eventUpdate.executorsIds = executors.map(executor => executor.id)
      }
      if (image) eventUpdate.imageId = image.id
      if (files.length) eventUpdate.filesIds = files.map(file => file.id)

      if (!eventId) {
        const event = await events.create({
          ...eventUpdate,
          departmentId: user!.departmentId!,
        })

        if (!window.location.pathname.includes(`${event.id}`)) {
          navigate(`/event/${event.id}/edit`)
        }
      } else {
        await events.update(+eventId, eventUpdate)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getPlaces = (): (PlaceOnline | PlaceOffline)[] => {
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

    if (connectionLink || recordLink || identifier || accessCode) {
      const onlinePlace: PlaceOnline = {
        is_online: true,
      }

      if (connectionLink) onlinePlace.connection_link = connectionLink
      if (recordLink) onlinePlace.record_link = recordLink
      if (identifier) onlinePlace.identifier = identifier
      if (accessCode) onlinePlace.access_code = accessCode

      places.push(onlinePlace)
    }

    return places
  }

  const renderStateButtons = () => (
    <div className="event_create--header">
      <Button
        text="Назад"
        colorType="secondary"
        iconBefore="ARROW_SMALL_LEFT"
      />
      <Button text="Сохранить" onClick={saveEvent} />
    </div>
  )

  const renderManagementData = () => (
    <div className="management-data">
      <Input
        label="Название мероприятия"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <Dropdown
        id="event-type-dropdown"
        items={eventTypes.map(type => ({
          id: type.id,
          text: type.name,
        }))}
        onChangeDropdown={selected =>
          setType(
            !Array.isArray(selected) && selected
              ? (eventTypes.find(type => type.id === +selected.id) ?? null)
              : null,
          )
        }
      />
      <Dropdown
        id="event-status-dropdown"
        multiple
        items={eventExecutors.map(executor => ({
          id: executor.id,
          text: executor.name,
          avatar: {
            src: executor.avatar?.url ?? '',
            description: executor.position,
          },
        }))}
        onChangeDropdown={selected =>
          setExecutors(() =>
            eventExecutors.filter(executor =>
              Array.isArray(selected)
                ? selected.some(sel => sel.id === executor.id)
                : selected?.id === executor.id,
            ),
          )
        }
      />
    </div>
  )

  const renderPlaces = () => (
    <div className="places">
      <Input
        label="Адрес"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <Input
        label="Этаж"
        value={floor}
        onChange={e => setFloor(+e.target.value)}
      />
      <Input
        label="Аудитория"
        value={officeNumber}
        onChange={e => setOfficeNumber(e.target.value)}
      />
      <Input
        label="Площадка"
        value={platform}
        onChange={e => setPlatform(e.target.value)}
      />
      <Input
        label="Ссылка для подключения"
        value={connectionLink}
        onChange={e => setConnectionLink(e.target.value)}
      />
      <Input
        label="Ссылка на запись и презентацию"
        value={recordLink}
        onChange={e => setRecordLink(e.target.value)}
      />
      <Input
        label="Идентификатор"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
      />
      <Input
        label="Код доступа"
        value={accessCode}
        onChange={e => setAccessCode(e.target.value)}
      />
    </div>
  )

  return (
    <>
      {!isLoading ? (
        <div className="event_create">
          {renderStateButtons()}
          <ContainerBox>
            <EventCreateImage image={image} setImage={setImage} />
            <TextEditor
              value={description ?? ''}
              onChange={e => setDescription(e.editor.getHTML())}
            />
            {renderManagementData()}
            {renderPlaces()}
            <EventCreateSchedule
              schedule={schedule}
              setSchedule={setSchedule}
            />
            <EventCreateFiles files={files} setFiles={setFiles} />
          </ContainerBox>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}
