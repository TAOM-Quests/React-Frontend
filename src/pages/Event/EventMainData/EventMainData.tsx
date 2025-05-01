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
import './EventMainData.scss'
import { EventType } from '../../../models/eventType'

export interface EventMainDataProps {
  eventId: number
  department: Department
  date?: Date
  name?: string
  image?: ServerFile
  participants?: Participant[]
  places?: (PlaceOnline | PlaceOffline)[]
  type?: EventType
}

export const EventMainData = ({
  date,
  name,
  image,
  places,
  eventId,
  department,
  participants,
  type,
}: EventMainDataProps) => {
  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  const placeOnline: PlaceOnline = places?.find(
    place => place.is_online,
  ) as PlaceOnline
  const placeOffline: PlaceOffline = places?.find(
    place => !place.is_online,
  ) as PlaceOffline

  const addParticipant = () => {
    if (!user) {
      navigate('/login')
      return
    }

    events.changeParticipant(+eventId!, {
      add: [user.id],
    })
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
          <div className="body_xl_m event-banner__info-row">
            <Icon icon="CALENDAR" colorIcon="subdued" />
            <span>{moment(date).format('DD MMMM YYYY год')}</span>
          </div>
          <div className="body_xl_m event-banner__info-row">
            <Icon icon="TIME" colorIcon="subdued" />
            <span>{moment(date).format('HH:mm')}</span>
          </div>
          {placeOffline?.address && (
            <div className="body_xl_m event-banner__info-row">
              <Icon icon="MARKER_MAP" colorIcon="subdued" />
              <span>{placeOffline?.address}</span>
            </div>
          )}

          {placeOnline?.platform && (
            <div className="body_xl_m event-banner__info-row">
              <Icon icon="PLATFORM" colorIcon="subdued" />
              <span>{placeOnline?.platform}</span>
            </div>
          )}
          <div className="body_xl_m event-banner__info-row">
            <Icon icon="DEPARTMENT" colorIcon="subdued" />
            <span>{department.name}</span>
          </div>
          <div className="body_xl_m event-banner__info-row">
            <Icon icon="GRADUATION_CAP" colorIcon="subdued" />
            <span>{type?.name}</span>
          </div>
        </div>

        {user &&
        !participants?.map(participant => participant.id).includes(user.id) ? (
          <div>
            <Button colorType="secondary" text="Вы зарегистрированы" disabled />
          </div>
        ) : (
          <div>
            <Button text="Участвовать" onClick={addParticipant} />
          </div>
        )}
      </div>
    </div>
  )
}
