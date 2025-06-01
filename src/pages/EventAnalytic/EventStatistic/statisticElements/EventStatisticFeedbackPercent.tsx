import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'

export const EventStatisticFeedbackPercent = ({
  participants,
  feedbackAnswers,
}: EventAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p>Процент обратной связи</p>
      <p>{feedbackAnswers.length / participants.length}</p>
    </ContainerBox>
  )
}
