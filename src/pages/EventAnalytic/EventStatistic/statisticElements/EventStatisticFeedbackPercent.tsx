import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'

export const EventStatisticFeedbackPercent = ({
  participants,
  feedbackAnswers,
}: EventAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p className="body_m_r event-statistic__cards--title">
        Процент обратной связи
      </p>
      <p className="heading_4">
        {feedbackAnswers.length > 0 && participants.length > 0
          ? (feedbackAnswers.length / participants.length).toFixed(3)
          : 0}
        %
      </p>
    </ContainerBox>
  )
}
