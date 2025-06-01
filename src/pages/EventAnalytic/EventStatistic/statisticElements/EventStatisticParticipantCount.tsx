import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'

export const EventStatisticParticipantCount = ({
  participants,
}: EventAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p>Количество зарегистрированных участников</p>
      <p>{participants.length}</p>
    </ContainerBox>
  )
}
