import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'

export const EventStatisticFeedbackCount = ({
  feedbackAnswers,
}: EventAnalyticElementProps) => {
  return (
    <ContainerBox>
      <p>Количество обратных связей</p>
      <p>{feedbackAnswers.length}</p>
    </ContainerBox>
  )
}
