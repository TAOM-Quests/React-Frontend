import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { EventStatisticElementProps } from './eventStatisticElementProps'

export const EventStatisticParticipantCount = ({
  participants,
}: EventStatisticElementProps) => {
  return (
    <ContainerBox>
      <p>Количество зарегистрированных участников</p>
      <p>{participants.length}</p>
    </ContainerBox>
  )
}
