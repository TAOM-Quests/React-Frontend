import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { QuestAnalyticElementProps } from '../../questAnalyticElementProps'

export const QuestStatisticCorrectAnswerPercent = ({
  questAnswers,
}: QuestAnalyticElementProps) => {
  const answersCount = questAnswers.reduce(
    (acc, quest) =>
      acc + (quest.questions?.map(question => question.answer).length ?? 0),
    0,
  )
  const correctAnswersCount = questAnswers.reduce(
    (acc, quest) =>
      acc +
      (quest.questions
        ?.map(question => question.answer)
        .filter(answer => answer.isCorrectAnswer).length ?? 0),
    0,
  )
  const percent = answersCount ? (correctAnswersCount / answersCount) * 100 : 0

  return (
    <ContainerBox>
      <p className="body_m_r statistic__cards--title">
        Процент правильных ответов
      </p>
      <p className="heading_4">{percent.toFixed(3).replace(/\.?0+$/, '')}</p>
    </ContainerBox>
  )
}
