import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'

export const EventStatisticFeedbackPercent = ({
  participants,
  feedbackAnswers,
}: EventAnalyticElementProps) => {
  const value =
    feedbackAnswers.length > 0 && participants.length > 0
      ? (feedbackAnswers.length / participants.length) * 100
      : 0

  const formatted = Number.isInteger(value)
    ? value
    : value.toFixed(3).replace(/\.?0+$/, '')

  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">Процент обратной связи</p>
      <p className="heading_4">{formatted}%</p>
    </ContainerBox>
  )
}
