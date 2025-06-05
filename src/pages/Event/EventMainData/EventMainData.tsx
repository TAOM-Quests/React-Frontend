import moment from 'moment'
import { Button } from '../../../components/UI/Button/Button'
import { Icon } from '../../../components/UI/Icon/Icon'
import { Department } from '../../../models/department'
import { PlaceOffline, PlaceOnline } from '../../../models/event'
import { ServerFile } from '../../../models/serverFile'
import { events } from '../../../services/api/eventModule/events/events'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'
import { useNavigate } from 'react-router'
import { Participant } from '../../../models/user'
import { EventType } from '../../../models/eventType'
import './EventMainData.scss'
import { EventTag } from '../../../models/eventTag'
import { Tag } from '../../../components/UI/Tag/Tag'
import { useEffect, useState } from 'react'

export interface EventMainDataProps {
  eventId: number
  tags: EventTag[]
  department: Department
  participants: Participant[]
  places: (PlaceOnline | PlaceOffline)[]
  date?: Date
  name?: string
  type?: EventType
  image?: ServerFile
}

export const EventMainData = ({
  date,
  name,
  type,
  tags,
  image,
  places,
  eventId,
  department,
  participants,
}: EventMainDataProps) => {
  const [isParticipant, setIsParticipants] = useState(false)

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  const placeOnline: PlaceOnline = places?.find(
    place => place.is_online,
  ) as PlaceOnline
  const placeOffline: PlaceOffline = places?.find(
    place => !place.is_online,
  ) as PlaceOffline

  useEffect(() => {
    setIsParticipants(
      participants?.some(participant => participant.id === user?.id),
    )
  }, [participants, user])

  const addParticipant = () => {
    if (!user) {
      navigate('/login')
      return
    }

    events.changeParticipant(+eventId!, {
      add: [user.id],
    })
    setIsParticipants(true)
  }

  const removeParticipant = () => {
    if (!user) return

    events.changeParticipant(+eventId!, {
      remove: [user.id],
    })
    setIsParticipants(false)
  }

  return (
    <div
      className="event-banner"
      style={{
        backgroundImage: image ? `url(${image.url})` : undefined,
      }}
    >
      <div className="event-banner__overlay" />
      <div className="event-banner__content">
        <h3 className="heading_3 event-banner__title">{name}</h3>

        <div className="event-banner__info-rows">
          {date && (
            <div className="body_xl_m event-banner__info-row">
              <Icon icon="CALENDAR" size={'large'} colorIcon="subdued" />
              <span>{moment(date).format('DD MMMM YYYY год')}</span>
            </div>
          )}
          {date && (
            <div className="body_xl_m event-banner__info-row">
              <Icon icon="TIME" size={'large'} colorIcon="subdued" />
              <span>{moment(date).format('HH:mm')}</span>
            </div>
          )}

          {placeOffline?.address && (
            <div className="body_xl_m event-banner__info-row">
              <div className="event-banner__info-row-icon">
                <Icon icon="MARKER_MAP" size={'large'} colorIcon="subdued" />
              </div>

              <span>{placeOffline?.address}</span>
            </div>
          )}

          {placeOnline?.platform && (
            <div className="body_xl_m event-banner__info-row">
              <div className="event-banner__info-row-icon">
                <Icon icon="PLATFORM" size={'large'} colorIcon="subdued" />
              </div>
              <span>{placeOnline?.platform}</span>
            </div>
          )}
          {type?.name && (
            <div className="body_xl_m event-banner__info-row">
              <Icon icon="GRADUATION_CAP" size={'large'} colorIcon="subdued" />
              <span>{type?.name}</span>
            </div>
          )}
          <div className="body_xl_m event-banner__info-row">
            <div className="event-banner__info-row-icon">
              <Icon icon="DEPARTMENT" size={'large'} colorIcon="subdued" />
            </div>
            <span>{department.name}</span>
          </div>
        </div>

        {tags?.length ? (
          <div className="event-banner__tags">
            {tags?.map(tag => (
              <Tag key={tag.id} text={tag.name} size="small"></Tag>
            ))}
          </div>
        ) : null}

        {!user?.isEmployee && (
          <>
            {user && isParticipant ? (
              <div className="event-banner__buttons">
                <Button
                  colorType="secondary"
                  text="Вы зарегистрированы"
                  disabled
                />
                <Icon
                  icon="CROSS"
                  size="large"
                  colorIcon="subdued"
                  onClick={removeParticipant}
                />
              </div>
            ) : (
              <div>
                <Button text="Участвовать" onClick={addParticipant} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
