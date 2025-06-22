import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { QuestAnalyticElementProps } from '../../questAnalyticElementProps'

export const QuestStatisticParticipantCount = ({
  participants,
}: QuestAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">Прошли до конца</p>
      <div className="statistic__participant-count">
        <p className="heading_4">{participants.length}</p>
        <Icon icon="USER" />
      </div>
    </ContainerBox>
  )
}
