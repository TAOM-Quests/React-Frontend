import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'
import { useNavigate, useParams } from 'react-router'
import { EventType } from '../../models/eventType'
import { Employee } from '../../models/user'
import { Button } from '../../components/UI/Button/Button'
import { events } from '../../services/api/eventModule/events/events'
import { users } from '../../services/api/userModule/users/users'
import { PlaceOffline, PlaceOnline, ScheduleItem } from '../../models/event'
import {
  EventCreateSchedule,
  EventCreateScheduleRef,
} from './EventCreateSchedule/EventCreateSchedule'
import { TextEditor } from '../../components/TextEditor/TextEditor'
import { EventCreateImage } from './EventCreateImage/EventCreateImage'
import { EventCreateFiles } from './EventCreateFiles/EventCreateFiles'
import { ServerFile } from '../../models/serverFile'
import { EventUpdateDto } from '../../services/api/eventModule/events/eventsDto'
import './EventCreate.scss'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'
import moment from 'moment'

import { Checkbox } from '../../components/UI/Checkbox/Checkbox'
import { EventCreatePlace } from './EventCreatePlace/EventCreatePlace'
import { EventCreateManagementData } from './EventCreateManagementData/EventCreateManagementData'
import { validateDate } from '../../validation/validateDate'
import { validateTime } from '../../validation/validateTime'
import { Loading } from '../../components/Loading/Loading'

const additionalInfoItems: string[] = [
  'Доставка в Академию и обратно осуществляется корпоративными автобусами (график по ссылке https://taom.academy/schedule).',
  'Следите за новостями на сайте Академии https://taom.academy и в социальных сетях https://vk.com/taom_ru, https://dzen.ru/taom и https://t.me/taomacademyabitur.',
]
const additionalInfoSeparator = '<-- Additional info ->'

export const EventCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const eventId = useParams().id
  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [eventExecutors, setEventExecutors] = useState<Employee[]>([])

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [type, setType] = useState<EventType | null>(null)
  const [executors, setExecutors] = useState<Employee[]>([])
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string>('')
  const [seatsNumber, setSeatsNumber] = useState<number | null>(null)

  const [address, setAddress] = useState<string>('')
  const [floor, setFloor] = useState<number | null>(null)
  const [officeNumber, setOfficeNumber] = useState<string>('')
  const [platform, setPlatform] = useState<string>('')
  const [connectionLink, setConnectionLink] = useState<string>('')
  const [recordLink, setRecordLink] = useState<string>('')
  const [identifier, setIdentifier] = useState<string>('')
  const [accessCode, setAccessCode] = useState<string>('')

  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const scheduleRef = useRef<EventCreateScheduleRef>(null)
  const [hasScheduleErrors, setHasScheduleErrors] = useState(false)

  const [image, setImage] = useState<ServerFile | null>(null)
  const [files, setFiles] = useState<ServerFile[]>([])
  const [additionalInfoTexts, setAdditionalInfoTexts] = useState<string[]>([])

  const dateValidator = useMemo(() => validateDate(date, !!time), [date, time])
  const timeValidator = useMemo(() => validateTime(time, !!date), [time, date])

  const handleChange = (text: string) => {
    setAdditionalInfoTexts(prev =>
      prev.includes(text)
        ? prev.filter(item => item !== text)
        : [...prev, text],
    )
  }

  useEffect(() => {
    const fetchCreateEventData = async () => {
      try {
        setEventTypes(await events.getTypes())
        setEventExecutors(await users.getEmployees())
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }

    const fetchEventData = async (id: number) => {
      try {
        const event = await events.getOne({ id })

        if (event.date) setDate(event.date)
        if (event.name) setName(event.name)
        if (event.type) setType(event.type)
        if (event.image) setImage(event.image)
        if (event.files) setFiles(event.files)
        if (event.status) setSchedule(event.schedule)
        if (event.executors) setExecutors(event.executors)
        if (event.description)
          setDescription(event.description.split(additionalInfoSeparator)[0])
        if (event.description)
          setAdditionalInfoTexts(
            event.description
              .split(additionalInfoSeparator)[1]
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
      if (!user) throw new Error('User not authenticated')

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
          ${additionalInfoSeparator}
          ${additionalInfoTexts.join('<br>')}
        `,
        seatsNumber: seatsNumber ?? undefined,
        places: getPlaces(),
        schedule,
        executorsIds: executors.map(executor => executor.id),
        imageId: image?.id,
        filesIds: files.map(file => file.id),
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
          departmentId: user!.departmentId!,
        })

        if (!window.location.pathname.includes(`${event.id}`)) {
          navigate(`/event/${event.id}/edit`)
        }
      } else {
        await events.update(+eventId, eventUpdate)
      }
    } catch (e) {
      console.log(`[QuestCreatePag] ${e}`)
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

  const renderStateButtons = () => (
    <div className="event_create--header">
      <Button
        text="Назад"
        colorType="secondary"
        iconBefore="ARROW_SMALL_LEFT"
      />
      <Button
        text="Сохранить"
        disabled={
          !dateValidator.isValid || !timeValidator.isValid || hasScheduleErrors
        }
        onClick={() => {
          if (
            dateValidator.isValid &&
            timeValidator.isValid &&
            !hasScheduleErrors
          ) {
            saveEvent()
          }
        }}
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
            <div className="event_create--container">
              <div>
                <EventCreateManagementData
                  name={name}
                  setName={setName}
                  eventTypes={eventTypes}
                  type={type}
                  setType={setType}
                  date={date}
                  setDate={setDate}
                  dateValidator={dateValidator}
                  time={time}
                  setTime={setTime}
                  timeValidator={timeValidator}
                  seatsNumber={seatsNumber}
                  setSeatsNumber={setSeatsNumber}
                  eventExecutors={eventExecutors}
                  executors={executors}
                  setExecutors={setExecutors}
                />
                <TextEditor
                  value={description ?? ''}
                  label="Описание мероприятия"
                  placeholder="Описание мероприятия"
                  onChange={e => setDescription(e.editor.getHTML())}
                />
                <EventCreatePlace
                  address={address}
                  setAddress={setAddress}
                  floor={floor}
                  setFloor={setFloor}
                  officeNumber={officeNumber}
                  setOfficeNumber={setOfficeNumber}
                  platform={platform}
                  setPlatform={setPlatform}
                  connectionLink={connectionLink}
                  setConnectionLink={setConnectionLink}
                  recordLink={recordLink}
                  setRecordLink={setRecordLink}
                  identifier={identifier}
                  setIdentifier={setIdentifier}
                  accessCode={accessCode}
                  setAccessCode={setAccessCode}
                />
                <EventCreateSchedule
                  ref={scheduleRef}
                  schedule={schedule}
                  setSchedule={setSchedule}
                  onErrorsChange={setHasScheduleErrors}
                />
              </div>
              <div>
                <EventCreateFiles files={files} setFiles={setFiles} />
                <div className="additional-info">
                  <label className="body_s_sb label">
                    Дополнительная информация
                  </label>
                  <div className="additional-info_checkboxes">
                    {additionalInfoItems.map((text, index) => (
                      <Checkbox
                        key={index}
                        isSelected={additionalInfoTexts.includes(text)}
                        onChange={() => handleChange(text)}
                        label={text}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContainerBox>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
