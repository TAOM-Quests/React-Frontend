import { useNavigate, useParams, useSearchParams } from 'react-router'
import {
  EventCreateConstructorRef,
  EventCreateConstructorTab,
} from './EventCreateConstructorTab/EventCreateConstructorTab'
import { createRef, useRef } from 'react'
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

const TABS = ['Мероприятие', 'Обратная связь']
const STATUS_ID_DRAFT = 1
const STATUS_ID_WAIT_INSPECTION = 2
const STATUS_ID_ON_INSPECTION = 3
const STATUS_ID_REWORK = 4
const STATUS_ID_ACCEPTED = 5
const ROLE_ID_INSPECTOR = 2

export const EventCreate = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const eventId = useParams().id
  const navigate = useNavigate()
  const user = useAppSelector(selectAuth) as EmployeeAuth
  const eventConstructor = useRef<EventCreateConstructorRef>(null)
  const feedbackForm = useRef<EventFeedbackFormRef>(null)

  const saveValidate: boolean =
    eventConstructor.current?.dateValidator.isValid ||
    eventConstructor.current?.timeValidator.isValid ||
    !eventConstructor.current?.hasScheduleErrors

  const getTabIndex = () => Number(searchParams.get('tab'))
  const getActiveTab = () => {
    const tabIndex = getTabIndex()

    return (
      <>
        <div style={tabIndex === 0 ? {} : { display: 'none' }}>
          <EventCreateConstructorTab ref={eventConstructor} />
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
          {eventConstructor.current?.status && (
            <Badge
              type={getStatusColor(eventConstructor.current?.status.id)}
              text={`${eventConstructor.current?.status.name}`}
            />
          )}
          <Switcher
            options={TABS}
            onChange={option =>
              setSearchParams({ tab: `${TABS.indexOf(option)}` })
            }
            activeOption={TABS[getTabIndex()]}
          />
          {eventId &&
            eventConstructor.current?.status?.id === STATUS_ID_DRAFT && (
              <Button
                text="На проверку"
                disabled={saveValidate}
                onClick={() =>
                  eventConstructor.current?.changeEventStatus(
                    STATUS_ID_WAIT_INSPECTION,
                  )
                }
              />
            )}
          {eventId &&
            user.roleId === ROLE_ID_INSPECTOR &&
            eventConstructor.current?.status?.id ===
              STATUS_ID_ON_INSPECTION && (
              <>
                <Button
                  text="Отклонить"
                  onClick={() =>
                    eventConstructor.current?.changeEventStatus(
                      STATUS_ID_REWORK,
                    )
                  }
                  disabled={
                    eventConstructor.current?.comments.filter(
                      comment => !comment.id,
                    ).length <= 0
                  }
                />
                <Button
                  text="Утвердить"
                  onClick={() =>
                    eventConstructor.current?.changeEventStatus(
                      STATUS_ID_ACCEPTED,
                    )
                  }
                />
              </>
            )}
          <Button
            text="Сохранить"
            disabled={!saveValidate}
            onClick={() => {
              if (saveValidate) {
                eventConstructor.current?.saveEvent()
                feedbackForm.current?.saveFeedbackForm()
              }
            }}
          />
        </div>
      </div>

      {getActiveTab()}
    </div>
  )
}
