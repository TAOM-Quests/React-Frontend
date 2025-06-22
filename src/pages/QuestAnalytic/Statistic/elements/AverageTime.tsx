import moment from 'moment'
import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { QuestAnalyticElementProps } from '../../questAnalyticElementProps'

export const QuestStatisticAverageTime = ({
  questAnswers,
}: QuestAnalyticElementProps) => {
  const timeSumInSeconds = questAnswers.reduce((acc, quest) => {
    const minutesCount = quest.time?.split(':').shift() ?? 0
    const secondsCount = quest.time?.split(':').pop() ?? 0
    return acc + +minutesCount * 60 + +secondsCount
  }, 0)
  const questAnswersCount = questAnswers.length
  const averageTimeInSeconds = questAnswersCount
    ? timeSumInSeconds / questAnswersCount
    : 0
  const average = moment(averageTimeInSeconds * 1000).format('mm:ss')

  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">
        Среднее время прохождения
      </p>
      <p className="heading_4">{average}</p>
    </ContainerBox>
  )
}
