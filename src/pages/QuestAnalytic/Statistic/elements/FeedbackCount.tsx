import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { QuestAnalyticElementProps } from '../../questAnalyticElementProps'

export const QuestStatisticFeedbackCount = ({
  feedbackAnswers,
}: QuestAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">
        Количество обратных связей
      </p>
      <p className="heading_4">{feedbackAnswers.length}</p>
    </ContainerBox>
  )
}
