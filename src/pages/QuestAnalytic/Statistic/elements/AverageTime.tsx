import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { QuestAnalyticElementProps } from '../../questAnalyticElementProps'

export const QuestStatisticAverageTime = ({
  participants,
  questAnswers,
}: QuestAnalyticElementProps) => {
  const timeSumInSeconds = questAnswers.reduce((acc, quest) => {
    const minutesCount = quest.time?.split(':').shift() ?? 0
    const secondsCount = quest.time?.split(':').pop() ?? 0
    return acc + +minutesCount * 60 + +secondsCount
  }, 0)
  const participantsCount = participants.length
  const averageTimeInSeconds = participantsCount
    ? timeSumInSeconds / participantsCount
    : 0
  const average = `${Math.floor(averageTimeInSeconds / 60)}:${averageTimeInSeconds % 60}`

  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">
        Среднее количество правильных ответов
      </p>
      <p className="heading_4">{average}</p>
    </ContainerBox>
  )
}
