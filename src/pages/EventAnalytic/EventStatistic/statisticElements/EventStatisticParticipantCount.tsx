import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'

export const EventStatisticParticipantCount = ({
  participants,
}: EventAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">
        Количество зарегистрированных участников
      </p>
      <div className="statistic__participant-count">
        <p className="heading_4">{participants.length}</p>
        <Icon icon="USER" />
      </div>
    </ContainerBox>
  )
}
