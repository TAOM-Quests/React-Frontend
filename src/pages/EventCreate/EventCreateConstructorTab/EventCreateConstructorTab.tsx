import {
  useState,
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Dispatch,
  SetStateAction,
} from 'react'
import { useParams, useNavigate } from 'react-router'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { TextEditor } from '../../../components/TextEditor/TextEditor'
import { Checkbox } from '../../../components/UI/Checkbox/Checkbox'
import { ImageContainer } from '../../../components/UI/ImageContainer/ImageContainer'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { ScheduleItem } from '../../../models/event'
import { EventTag } from '../../../models/eventTag'
import { EventType } from '../../../models/eventType'
import { ServerFile } from '../../../models/serverFile'
import { Employee } from '../../../models/user'
import { EmployeeAuth } from '../../../models/userAuth'
import { selectAuth } from '../../../redux/auth/authSlice'
import { validateDate } from '../../../validation/validateDate'
import { validateTime } from '../../../validation/validateTime'
import { EventCreateFiles } from './EventCreateFiles/EventCreateFiles'
import { EventCreateManagementData } from './EventCreateManagementData/EventCreateManagementData'
import { EventCreatePlace } from './EventCreatePlace/EventCreatePlace'
import {
  EventCreateScheduleRef,
  EventCreateSchedule,
} from './EventCreateSchedule/EventCreateSchedule'
import './EventCreateConstructorTab.scss'
import { Loading } from '../../../components/Loading/Loading'
import { EventStatus } from '../../../models/eventStatus'
import { fetchCreateEventData } from './utils/fetchCreateEventData'
import { fetchEventData } from './utils/fetchEventData'
import { saveEvent } from './utils/saveEvent'
import { Comment } from '../../../models/comment'
import { EventsCreateInspectorComments } from './EventsCreateInspectorComments/EventsCreateInspectorComments'

const additionalInfoItems: string[] = [
  '<p>Доставка в Академию и обратно осуществляется корпоративными автобусами (<a target="_blank" rel="noopener noreferrer nofollow" href="https://taom.academy/schedule">График</a>).</p>',
  '<p>Следите за новостями на <a target="_blank" rel="noopener noreferrer nofollow" href="https://taom.academy">сайте Академии</a> и в социальных сетях <a target="_blank" rel="noopener noreferrer nofollow" href="https://vk.com/taom_ru">https://vk.com/taom_ru</a>, <a target="_blank" rel="noopener noreferrer nofollow" href="https://dzen.ru/taom">https://dzen.ru/taom</a> и <a target="_blank" rel="noopener noreferrer nofollow" href="https://t.me/taomacademyabitur">https://t.me/taomacademyabitur</a>.</p>',
]
const ADDITIONAL_INFO_SEPARATOR = '<!-- Additional info -->'
const STATUS_ID_ON_INSPECTION = 3
const ROLE_ID_INSPECTOR = 2

export interface EventCreateConstructorRef {
  saveEvent: () => Promise<void>
}

interface EventCreateConstructorProps {
  status: EventStatus | null
  setStatus: Dispatch<SetStateAction<EventStatus | null>>
  comments: Comment[]
  setComments: Dispatch<SetStateAction<Comment[]>>
  changeIsValid: (isValid: boolean) => void
}

export const EventCreateConstructorTab = forwardRef(
  (
    {
      changeIsValid,
      status,
      setStatus,
      comments,
      setComments,
    }: EventCreateConstructorProps,
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [eventTags, setEventTags] = useState<EventTag[]>([])
    const [eventTypes, setEventTypes] = useState<EventType[]>([])
    const [eventExecutors, setEventExecutors] = useState<Employee[]>([])

    const [name, setName] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [date, setDate] = useState<Date | null>(null)
    const [type, setType] = useState<EventType | null>(null)
    const [description, setDescription] = useState<string>('')
    const [executors, setExecutors] = useState<Employee[]>([])
    const [seatsNumber, setSeatsNumber] = useState<number | null>(null)
    const [tags, setTags] = useState<(EventTag & { isUserAdded?: boolean })[]>(
      [],
    )

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

    const navigate = useNavigate()
    const { id: eventId } = useParams()
    const user = useAppSelector(selectAuth) as EmployeeAuth

    const dateValidator = useMemo(
      () => validateDate(date, !!time),
      [date, time],
    )
    const timeValidator = useMemo(
      () => validateTime(time, !!date),
      [time, date],
    )

    useImperativeHandle(
      ref,
      (): EventCreateConstructorRef => ({
        saveEvent: saveEventHandler,
      }),
      [
        name,
        time,
        date,
        type,
        description,
        executors,
        seatsNumber,
        tags,
        address,
        floor,
        officeNumber,
        platform,
        connectionLink,
        recordLink,
        identifier,
        accessCode,
        schedule,
        image,
        files,
        additionalInfoTexts,
        status,
      ],
    )

    useEffect(() => {
      changeIsValid(
        dateValidator.isValid && timeValidator.isValid && !hasScheduleErrors,
      )
    }, [dateValidator.isValid, timeValidator.isValid])

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
          await fetchEventData(
            +eventId,
            ADDITIONAL_INFO_SEPARATOR,
            setEventState,
          )
        } else {
          if (!window.location.pathname.includes(`${savedEvent.id}`)) {
            navigate(`/event/${savedEvent.id}/edit`)
          }

          await fetchEventData(
            +savedEvent.id,
            ADDITIONAL_INFO_SEPARATOR,
            setEventState,
          )
        }
      } catch (e) {
        console.log(`[EventCreate] ${e}`)
      }
      setIsLoading(false)
    }

    return (
      <>
        {!isLoading ? (
          <>
            {(comments.length > 0 ||
              (user.roleId === ROLE_ID_INSPECTOR &&
                status?.id === STATUS_ID_ON_INSPECTION)) && (
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
                <div className="event_create--content__left">
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
                <div className="event_create--content__right">
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
                          label={
                            <span dangerouslySetInnerHTML={{ __html: text }} />
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ContainerBox>
          </>
        ) : (
          <Loading />
        )}
      </>
    )
  },
)
