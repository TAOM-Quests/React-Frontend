import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { QuestAnalyticElementProps } from '../../questAnalyticElementProps'

export const QuestStatisticFeedbackPercent = ({
  participants,
  feedbackAnswers,
}: QuestAnalyticElementProps) => {
  const value =
    feedbackAnswers.length > 0 && participants.length > 0
      ? (feedbackAnswers.length / participants.length) * 100
      : 0

  const formatted = Number.isInteger(value)
    ? value
    : value.toFixed(3).replace(/\.?0+$/, '')

  return (
    <ContainerBox>
      <p className="body_m_r event-statistic__cards--title">
        Процент обратной связи
      </p>
      <p className="heading_4">{formatted}%</p>
    </ContainerBox>
  )
}
