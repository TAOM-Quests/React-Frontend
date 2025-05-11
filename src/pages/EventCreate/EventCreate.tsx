import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'
import { useNavigate, useParams } from 'react-router'
import { EventType } from '../../models/eventType'
import { Employee } from '../../models/user'
import { Button } from '../../components/UI/Button/Button'
import { events } from '../../services/api/eventModule/events/events'
import { ScheduleItem } from '../../models/event'
import {
  EventCreateSchedule,
  EventCreateScheduleRef,
} from './EventCreateSchedule/EventCreateSchedule'
import { TextEditor } from '../../components/TextEditor/TextEditor'
import { EventCreateFiles } from './EventCreateFiles/EventCreateFiles'
import { ServerFile } from '../../models/serverFile'
import './EventCreate.scss'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'

import { Checkbox } from '../../components/UI/Checkbox/Checkbox'
import { EventCreatePlace } from './EventCreatePlace/EventCreatePlace'
import { EventCreateManagementData } from './EventCreateManagementData/EventCreateManagementData'
import { validateDate } from '../../validation/validateDate'
import { validateTime } from '../../validation/validateTime'
import { EventTag } from '../../models/eventTag'
import { ImageContainer } from '../../components/UI/ImageContainer/ImageContainer'
import { EmployeeAuth } from '../../models/userAuth'
import { fetchEventData } from './utils/fetchEventData'
import { fetchCreateEventData } from './utils/fetchCreateEventData'
import { Loading } from '../../components/Loading/Loading'
import { saveEvent } from './utils/saveEvent'
import { EventsCreateInspectorComments } from './EventsCreateInspectorComments/EventsCreateInspectorComments'
import { Comment } from '../../models/comment'
import { EventStatus } from '../../models/eventStatus'
import { Badge } from '../../components/UI/Badge/Badge'

const additionalInfoItems: string[] = [
  'Доставка в Академию и обратно осуществляется корпоративными автобусами (график по ссылке https://taom.academy/schedule).',
  'Следите за новостями на сайте Академии https://taom.academy и в социальных сетях https://vk.com/taom_ru, https://dzen.ru/taom и https://t.me/taomacademyabitur.',
]
const ADDITIONAL_INFO_SEPARATOR = '<-- Additional info ->'
const STATUS_ID_DRAFT = 1
const STATUS_ID_WAIT_INSPECTION = 2
const STATUS_ID_ON_INSPECTION = 3
const STATUS_ID_REWORK = 4
const STATUS_ID_ACCEPTED = 5
const ROLE_ID_INSPECTOR = 2

export const EventCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const eventId = useParams().id
  const navigate = useNavigate()
  const user = useAppSelector(selectAuth) as EmployeeAuth

  const [eventTags, setEventTags] = useState<EventTag[]>([])
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [eventExecutors, setEventExecutors] = useState<Employee[]>([])

  const [status, setStatus] = useState<EventStatus>({ id: 1, name: 'Черновик' })

  const [name, setName] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [type, setType] = useState<EventType | null>(null)
  const [description, setDescription] = useState<string>('')
  const [executors, setExecutors] = useState<Employee[]>([])
  const [seatsNumber, setSeatsNumber] = useState<number | null>(null)
  const [tags, setTags] = useState<(EventTag & { isUserAdded?: boolean })[]>([])

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

  const setCreateEventState = {
    setEventTags,
    setEventTypes,
    setEventExecutors,
  }

  const setEventState = {
    setDate,
    setName,
    setTags,
    setTime,
    setType,
    setFiles,
    setFloor,
    setImage,
    setStatus,
    setAddress,
    setComments,
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
  }

  const saveValidate: boolean =
    !dateValidator.isValid || !timeValidator.isValid || hasScheduleErrors

  useEffect(() => {
    setIsLoading(true)

    fetchCreateEventData(user.departmentId, setCreateEventState)
    if (eventId) {
      fetchEventData(+eventId, ADDITIONAL_INFO_SEPARATOR, setEventState)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!user?.isEmployee) {
      navigate('/')
    }
  }, [user])

  const handleChange = (text: string) => {
    setAdditionalInfoTexts(prev =>
      prev.includes(text)
        ? prev.filter(item => item !== text)
        : [...prev, text],
    )
  }
  const saveEventHandler = async () => {
    setIsLoading(true)
    try {
      const savedEvent = await saveEvent(
        eventId ? +eventId : undefined,
        user.departmentId,
        ADDITIONAL_INFO_SEPARATOR,
        user.id,
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
        },
      )

      if (eventId) {
        await fetchCreateEventData(user.departmentId, setCreateEventState)
        await fetchEventData(+eventId, ADDITIONAL_INFO_SEPARATOR, setEventState)
      } else {
        if (!window.location.pathname.includes(`${savedEvent.id}`)) {
          navigate(`/event/${savedEvent.id}/edit`)
        }
      }
    } catch (e) {
      console.log(`[EventCreate] ${e}`)
    }
    setIsLoading(false)
  }

  const navigateBack = () => navigate(-1)

  const changeEventStatus = async (statusId: number) => {
    try {
      if (!user) throw new Error('User not authenticated')
      if (!eventId) throw new Error('Event not found')

      await events.update(+eventId, {
        statusId,
        inspectorComments: comments.map(comment => ({
          ...comment,
          userId: comment.user.id,
        })),
      })

      if (
        statusId === STATUS_ID_WAIT_INSPECTION ||
        statusId === STATUS_ID_ACCEPTED
      ) {
        navigateBack()
      }
    } catch (e) {
      console.log(`[EventCreate] ${e}`)
    }
  }

  const renderStateButtons = () => (
    <div className="event_create--header">
      <Button
        text="Назад"
        colorType="secondary"
        iconBefore="ARROW_SMALL_LEFT"
        onClick={navigateBack}
      />
      {eventId &&
        user.roleId === ROLE_ID_INSPECTOR &&
        status?.id === STATUS_ID_ON_INSPECTION && (
          <>
            <Button
              text="Отклонить"
              onClick={() => changeEventStatus(STATUS_ID_REWORK)}
              disabled={comments.filter(comment => !comment.id).length <= 0}
            />
            <Button
              text="Утвердить"
              onClick={() => changeEventStatus(STATUS_ID_ACCEPTED)}
            />
          </>
        )}
      {eventId && status?.id === STATUS_ID_DRAFT && (
        <Button
          text="На проверку"
          disabled={saveValidate}
          onClick={() => changeEventStatus(STATUS_ID_WAIT_INSPECTION)}
        />
      )}
      <Button
        text="Сохранить"
        disabled={saveValidate}
        onClick={saveEventHandler}
      />
    </div>
  )

  return (
    <>
      {!isLoading ? (
        <div className="event_create">
          <Badge text={status?.name ?? ''} />
          {renderStateButtons()}
          {(comments.length > 0 || user.roleId === ROLE_ID_INSPECTOR) && (
            <EventsCreateInspectorComments
              comments={comments}
              setComments={setComments}
            />
          )}
          <ContainerBox>
            <ImageContainer
              selectedImages={image ? [image] : []}
              onSelectImages={images => setImage(images[0] ?? null)}
              placeholder="Перетащите изображение в эту область для загрузки или нажмите на неё"
            />
            <div className="event_create--container">
              <div>
                <EventCreateManagementData
                  name={name}
                  setName={setName}
                  eventTypes={eventTypes}
                  tags={tags}
                  setTags={setTags}
                  eventTags={eventTags}
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
