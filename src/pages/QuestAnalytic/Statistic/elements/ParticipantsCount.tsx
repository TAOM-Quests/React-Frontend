import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { QuestAnalyticElementProps } from '../../questAnalyticElementProps'

export const QuestStatisticParticipantCount = ({
  participants,
}: QuestAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p className="body_m_r event-statistic__cards--title">
        Количество зарегистрированных участников
      </p>
      <div className="event-statistic__participant-count">
        <p className="heading_4">{participants.length}</p>
        <Icon icon="USER" />
      </div>
    </ContainerBox>
  )
}
