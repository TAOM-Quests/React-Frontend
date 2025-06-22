import { useNavigate, useParams, useSearchParams } from 'react-router'
import {
  EventCreateConstructorRef,
  EventCreateConstructorTab,
} from './EventCreateConstructorTab/EventCreateConstructorTab'
import { Button } from '../../components/UI/Button/Button'
import { Switcher } from '../../components/UI/Switcher/Switcher'
import {
  EventCreateFeedbackTab,
  EventFeedbackFormRef,
} from './EventCreateFeedbackTab/EventCreateFeedbackTab'
import { Badge, TypeBadge } from '../../components/UI/Badge/Badge'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { EmployeeAuth } from '../../models/userAuth'
import { selectAuth } from '../../redux/auth/authSlice'
import { useEffect, useRef, useState } from 'react'
import { EventStatus } from '../../models/eventStatus'
import { events } from '../../services/api/eventModule/events/events'
import { Comment } from '../../models/comment'

const TABS = ['Мероприятие', 'Обратная связь']
const STATUS_ID_DRAFT = 1
const STATUS_ID_WAIT_INSPECTION = 2
const STATUS_ID_ON_INSPECTION = 3
const STATUS_ID_REWORK = 4
const STATUS_ID_ACCEPTED = 5

export const EventCreate = () => {
  const [isSaveValid, setIsSaveValid] = useState(true)
  const [status, setStatus] = useState<EventStatus | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  const isFirstRender = useRef(true)
  const feedbackForm = useRef<EventFeedbackFormRef>(null)
  const eventConstructor = useRef<EventCreateConstructorRef>(null)

  const navigate = useNavigate()
  const { id: eventId } = useParams()
  const user = useAppSelector(selectAuth) as EmployeeAuth
  const [searchParams, setSearchParams] = useSearchParams()

  /*
    Костыль для сохранения формы обратной связи при создании нового мероприятия
    При вызове сохранения формы в onClick кнопки сохранения
    useParams еще не обновится, так как не все рендеры закончатся
    Поэтому ждем пока рендеры закончатся и вызываем сохранение
    И чтобы сохранение не происходило при каждом рендере
    конструктора мероприятия используем isFirstRender
  */
  useEffect(() => {
    if (isSaveValid && !isFirstRender.current) {
      feedbackForm.current?.saveFeedbackForm()
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
    }
  }, [eventId])

  const getTabIndex = () => Number(searchParams.get('tab'))
  const getActiveTab = () => {
    const tabIndex = getTabIndex()

    return (
      <>
        <div style={tabIndex === 0 ? {} : { display: 'none' }}>
          <EventCreateConstructorTab
            status={status}
            setStatus={setStatus}
            comments={comments}
            setComments={setComments}
            ref={eventConstructor}
            changeIsValid={isValid => setIsSaveValid(isValid)}
          />
        </div>
        <div style={tabIndex === 1 ? {} : { display: 'none' }}>
          <EventCreateFeedbackTab
            ref={feedbackForm}
            eventId={eventId ? +eventId : null}
          />
        </div>
      </>
    )
  }

  const statusColor: { [key: number]: TypeBadge } = {
    1: 'neutral',
    5: 'success',
    4: 'critical',
    3: 'caution',
    2: 'info',
    6: 'neutral',
  }

  const getStatusColor = (statusId: number): TypeBadge => {
    return statusColor[statusId] ?? 'neutral'
  }

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
        statusId === STATUS_ID_REWORK ||
        statusId === STATUS_ID_ACCEPTED
      ) {
        navigate(`/profile?tab=1`)
      }
    } catch (e) {
      console.log(`[EventCreate] ${e}`)
    }
  }

  return (
    <div className="event_create">
      <div className="event_create--header">
        <Button
          text="Назад"
          colorType="secondary"
          iconBefore="ARROW_SMALL_LEFT"
          onClick={() => navigate(-1)}
        />
        <div className="event_create--header__buttons">
          {status && (
            <Badge type={getStatusColor(status.id)} text={`${status.name}`} />
          )}
          <Switcher
            options={TABS}
            onChange={option =>
              setSearchParams({ tab: `${TABS.indexOf(option)}` })
            }
            activeOption={TABS[getTabIndex()]}
          />
          {eventId && status?.id === STATUS_ID_DRAFT && (
            <Button
              text="На проверку"
              disabled={!isSaveValid}
              onClick={() => changeEventStatus(STATUS_ID_WAIT_INSPECTION)}
            />
          )}
          {eventId &&
            user.isInspector &&
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
          <Button
            text="Сохранить"
            disabled={!isSaveValid}
            onClick={async () => {
              if (isSaveValid) {
                await eventConstructor.current?.saveEvent()

                if (eventId) {
                  await feedbackForm.current?.saveFeedbackForm()
                }
              }
            }}
          />
        </div>
      </div>

      {getActiveTab()}
    </div>
  )
}
