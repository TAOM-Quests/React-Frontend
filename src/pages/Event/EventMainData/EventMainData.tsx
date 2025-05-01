import moment from 'moment'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
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

export interface EventMainDataProps {
  eventId: number
  department: Department
  date?: Date
  name?: string
  image?: ServerFile
  participants?: Participant[]
  places?: (PlaceOnline | PlaceOffline)[]
}

export const EventMainData = ({
  date,
  name,
  image,
  places,
  eventId,
  department,
  participants,
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
    <ContainerBox>
      <img src={image?.url} />
      <h1>{name}</h1>
      <div>
        <Icon icon="CALENDAR" />
        <span>{moment(date).format('DD MMMM YYYY год')}</span>
      </div>
      <div>
        <Icon icon="TIME" />
        <span>{moment(date).format('HH:mm')}</span>
      </div>
      <div>
        <Icon icon="MARKER_MAP" />
        <span>{placeOffline?.address}</span>
      </div>
      <div>
        <Icon icon="PLATFORM" />
        <span>{placeOnline?.platform}</span>
      </div>
      <div>
        <Icon icon="DEPARTMENT" />
        <span>{department.name}</span>
      </div>
      {user &&
      !participants?.map(participant => participant.id).includes(user.id) ? (
        <Button colorType="secondary" text="Вы зарегистрированы" disabled />
      ) : (
        <Button text="Участвовать" onClick={addParticipant} />
      )}
    </ContainerBox>
  )
}
