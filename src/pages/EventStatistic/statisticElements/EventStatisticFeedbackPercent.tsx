import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { EventStatisticElementProps } from './eventStatisticElementProps'

export const EventStatisticFeedbackPercent = ({
  participants,
  feedbackAnswers,
}: EventStatisticElementProps) => {
  return (
    <ContainerBox>
      <p>Процент обратной связи</p>
      <p>{feedbackAnswers.length / participants.length}</p>
    </ContainerBox>
  )
}
