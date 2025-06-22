import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'

export const EventStatisticFeedbackCount = ({
  feedbackAnswers,
}: EventAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">
        Количество обратных связей
      </p>
      <p className="heading_4">{feedbackAnswers.length}</p>
    </ContainerBox>
  )
}
