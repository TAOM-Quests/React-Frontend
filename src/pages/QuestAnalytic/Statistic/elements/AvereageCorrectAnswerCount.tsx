import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { QuestAnalyticElementProps } from '../../questAnalyticElementProps'

export const QuestStatisticAverageCorrectAnswerCount = ({
  questAnswers,
}: QuestAnalyticElementProps) => {
  const correctAnswersCount = questAnswers.reduce(
    (acc, quest) =>
      acc +
      (quest.questions
        ?.map(question => question.answer)
        .filter(answer => answer.isCorrectAnswer).length ?? 0),
    0,
  )
  const questAnswersCount = questAnswers.length
  const average = questAnswersCount
    ? correctAnswersCount / questAnswersCount
    : 0

  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">
        Среднее количество правильных ответов
      </p>
      <p className="heading_4">{average.toFixed(3).replace(/\.?0+$/, '')}</p>
    </ContainerBox>
  )
}
