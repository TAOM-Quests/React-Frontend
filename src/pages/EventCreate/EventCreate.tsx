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
import {
  EventCreateSchedule,
  ValidationError,
} from './EventCreateSchedule/EventCreateSchedule'
import { TextEditor } from '../../components/TextEditor/TextEditor'
import { EventCreateImage } from './EventCreateImage/EventCreateImage'
import { EventCreateFiles } from './EventCreateFiles/EventCreateFiles'
import { ServerFile } from '../../models/serverFile'
import { EventUpdateDto } from '../../services/api/eventModule/events/eventsDto'
import './EventCreate.scss'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'
import { DateInput } from '../../components/UI/DateInput/DateInput'
import { TimeInput } from '../../components/UI/TimeInput/TimeInput'
import moment from 'moment'
import { validateDate, validateTime } from '../../validation/validators'
import { NumberInput } from '../../components/UI/NumberInput/NumberInput'
import { Checkbox } from '../../components/UI/Checkbox/Checkbox'

const additionalInfoItems: string[] = [
  'Доставка в Академию и обратно осуществляется корпоративными автобусами (график по ссылке https://taom.academy/schedule).',
  'Следите за новостями на сайте Академии https://taom.academy и в социальных сетях https://vk.com/taom_ru, https://dzen.ru/taom и https://t.me/taomacademyabitur.',
]

export const EventCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [eventExecutors, setEventExecutors] = useState<Employee[]>([])
  const [image, setImage] = useState<ServerFile | null>(null)
  const [name, setName] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string>('')
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

  const [scheduleErrors, setScheduleErrors] = useState<ValidationError[]>([])
  const isScheduleValid = scheduleErrors.every(
    err => Object.keys(err).length === 0,
  )
  const [additionalInfoTexts, setAdditionalInfoTexts] = useState<string[]>([])
  console.log(additionalInfoTexts)
  const eventId = useParams().id
  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  let dateValidator = validateDate(date, !!time)
  let timeValidator = validateTime(time, !!date)

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

        if (event.name) setName(event.name)
        if (event.date) setDate(event.date)
        if (event.date) setTime(moment(event.date).format('HH:mm'))
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

  useEffect(() => {
    dateValidator = validateDate(date, !!time)
    timeValidator = validateTime(time, !!date)
  }, [date, time])

  const saveEvent = async () => {
    try {
      const eventUpdate: EventUpdateDto = {
        name,
        date: date
          ? moment(date)
              .set('hour', +time.split(':')[0])
              .set('minute', +time.split(':')[1])
              .toDate()
          : undefined,
        typeId: type?.id,
        description,
        seatsNumber: seatsNumber ?? undefined,
        places: getPlaces(),
        schedule,
        executorsIds: executors.map(executor => executor.id),
        imageId: image?.id,
        filesIds: files.map(file => file.id),
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
      <Button
        text="Сохранить"
        disabled={
          !dateValidator.isValid || !timeValidator.isValid || !isScheduleValid
        }
        onClick={() => {
          if (
            dateValidator.isValid &&
            timeValidator.isValid &&
            isScheduleValid
          ) {
            saveEvent()
          }
        }}
      />
    </div>
  )

  const renderManagementData = () => (
    <div className="management-data">
      <div className="management-data__container">
        <Input
          label="Название мероприятия"
          placeholder="Введите название мероприятия"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <Dropdown
          id="event-type-dropdown"
          label="Тип мероприятия"
          placeholder="Выберите тип мероприятия"
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
        <DateInput
          label="Дата"
          value={date}
          onDateSelect={date => setDate(date)}
          placeholder="Введите дату мероприятия"
          errorText={dateValidator.error}
        />
        <div className="management-data__miniInput">
          <TimeInput
            label="Время"
            value={time}
            onTimeSelect={time => setTime(time)}
            errorText={timeValidator.error}
          />
          <NumberInput
            min={0}
            value={seatsNumber}
            label="Количество мест"
            placeholder="Кол-во мест"
            onChange={seatsNumber => setSeatsNumber(seatsNumber)}
          />
        </div>
      </div>
      <Dropdown
        id="event-executor-dropdown"
        label="Организаторы"
        placeholder="Выберите организаторов мероприятия"
        isMultiple={true}
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
    <>
      <Input
        label="Адрес"
        placeholder="Введите адрес"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <div className="places">
        <div className="places__miniInput">
          <NumberInput
            min={0}
            label="Этаж"
            value={floor}
            placeholder="Введите этаж"
            onChange={floor => setFloor(floor)}
          />
          <Input
            label="Аудитория"
            placeholder="С-..."
            value={officeNumber}
            onChange={e => setOfficeNumber(e.target.value)}
          />
        </div>

        <Input
          label="Площадка"
          placeholder="Введите площадку"
          value={platform}
          onChange={e => setPlatform(e.target.value)}
        />
        <Input
          label="Ссылка для подключения"
          placeholder="https://..."
          value={connectionLink}
          onChange={e => setConnectionLink(e.target.value)}
        />
        <Input
          label="Ссылка на запись и презентацию"
          placeholder="https://..."
          value={recordLink}
          onChange={e => setRecordLink(e.target.value)}
        />
        <Input
          label="Идентификатор"
          placeholder="Введите идентификатор"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
        />
        <Input
          label="Код доступа"
          placeholder="Введите код доступа"
          value={accessCode}
          onChange={e => setAccessCode(e.target.value)}
        />
      </div>
    </>
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
                {renderManagementData()}
                <TextEditor
                  value={description ?? ''}
                  label="Описание мероприятия"
                  placeholder="Описание мероприятия"
                  onChange={e => setDescription(e.editor.getHTML())}
                />
                {renderPlaces()}
                <EventCreateSchedule
                  schedule={schedule}
                  setSchedule={setSchedule}
                  onErrorsChange={setScheduleErrors}
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
        <div>Loading</div>
      )}
    </>
  )
}
