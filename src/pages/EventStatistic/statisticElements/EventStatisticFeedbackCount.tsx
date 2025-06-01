import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { EventStatisticElementProps } from './eventStatisticElementProps'

export const EventStatisticFeedbackCount = ({
  feedbackAnswers,
}: EventStatisticElementProps) => {
  return (
    <ContainerBox>
      <p>Количество обратных связей</p>
      <p>{feedbackAnswers.length}</p>
    </ContainerBox>
  )
}
