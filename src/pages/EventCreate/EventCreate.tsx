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
import { EventCreateDto } from '../../services/api/eventModule/events/eventsDto'

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

  const eventId = useParams().id
  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

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
          place => !place.isOnline,
        ) as PlaceOffline
        const onlinePlace: PlaceOnline = event.places.find(
          place => place.isOnline,
        ) as PlaceOnline

        if (offlinePlace) {
          if (offlinePlace.floor) setFloor(offlinePlace.floor)
          if (offlinePlace.address) setAddress(offlinePlace.address)
          if (offlinePlace.officeNumber)
            setOfficeNumber(offlinePlace.officeNumber)
        }

        if (onlinePlace) {
          if (onlinePlace.platform) setPlatform(onlinePlace.platform)
          if (onlinePlace.connectionLink)
            setConnectionLink(onlinePlace.connectionLink)
          if (onlinePlace.recordLink) setRecordLink(onlinePlace.recordLink)
          if (onlinePlace.identifier) setIdentifier(onlinePlace.identifier)
          if (onlinePlace.accessCode) setAccessCode(onlinePlace.accessCode)
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
      const eventCreate: EventCreateDto = {
        departmentId: user!.departmentId!,
      }

      if (name) eventCreate.name = name
      if (type) eventCreate.typeId = type.id
      if (description) eventCreate.description = description
      if (seatsNumber) eventCreate.seatsNumber = seatsNumber
      if (getPlaces().length) eventCreate.places = getPlaces()
      if (schedule.length) eventCreate.schedule = schedule
      if (executors.length) {
        eventCreate.executorsIds = executors.map(executor => executor.id)
      }
      if (image) eventCreate.imageId = image.id
      if (files.length) eventCreate.filesIds = files.map(file => file.id)

      const event = await events.create(eventCreate)

      if (!window.location.pathname.includes(`${event.id}`)) {
        navigate(`/event/${event.id}/edit`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getPlaces = (): (PlaceOnline | PlaceOffline)[] => {
    const places: (PlaceOnline | PlaceOffline)[] = []

    if (address || floor || officeNumber) {
      const offlinePlace: PlaceOffline = {
        isOnline: false,
      }

      if (address) offlinePlace.address = address
      if (floor) offlinePlace.floor = floor
      if (officeNumber) offlinePlace.officeNumber = officeNumber

      places.push(offlinePlace)
    }

    if (connectionLink || recordLink || identifier || accessCode) {
      const onlinePlace: PlaceOnline = {
        isOnline: true,
      }

      if (connectionLink) onlinePlace.connectionLink = connectionLink
      if (recordLink) onlinePlace.recordLink = recordLink
      if (identifier) onlinePlace.identifier = identifier
      if (accessCode) onlinePlace.accessCode = accessCode

      places.push(onlinePlace)
    }

    return places
  }

  const renderStateButtons = () => (
    <div>
      <div className="state-buttons">
        <Button
          text="Назад"
          colorType="secondary"
          iconBefore="ARROW_SMALL_LEFT"
        />
        <Button colorType="primary" text="Создать" />
      </div>
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
            selected
              ? (eventTypes.find(type => type.id === +selected) ?? null)
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
          setExecutors(prevExecutors =>
            eventExecutors.filter(executor =>
              typeof selected !== 'number'
                ? selected?.includes(executor.id)
                : [],
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
        <>
          <EventCreateImage image={image} setImage={setImage} />
          {renderStateButtons()}
          <TextEditor
            value={description ?? ''}
            onChange={e => setDescription(e.editor.getHTML())}
          />
          {renderManagementData()}
          {renderPlaces()}
          <EventCreateSchedule schedule={schedule} setSchedule={setSchedule} />
          <EventCreateFiles files={files} setFiles={setFiles} />
          <Button text="Сохранить" onClick={saveEvent} />
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}
