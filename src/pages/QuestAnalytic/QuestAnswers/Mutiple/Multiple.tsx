import {
  TableColumn,
  TableEdit,
} from '../../../../components/Table/TableEdit/TableEdit'
import { Quest } from '../../../../models/quest'
import { QuestQuestionMultiple } from '../../../../models/questQuestion'

interface QuestAnswerMultipleColumn {
  id: number
  option: string
  isCorrect: boolean
  answerCount: number
  answerPercent: number
}

const COLUMNS: TableColumn<QuestAnswerMultipleColumn>[] = [
  {
    key: 'option',
    title: 'Вариант ответа',
  },
  {
    key: 'answerPercent',
    title: 'Доля ответов',
  },
  {
    key: 'answerCount',
    title: 'Количество ответов',
  },
  {
    key: 'isCorrect',
    title: 'Правильный ответ',
  },
]

export interface QuestAnalyticAnswerMultipleProps {
  questAnswers: Quest[]
  questionIndex: number
  question: QuestQuestionMultiple
}

export const QuestAnalyticAnswerMultiple = ({
  question,
  questAnswers,
  questionIndex,
}: QuestAnalyticAnswerMultipleProps) => {
  const getTableRows = (): QuestAnswerMultipleColumn[] => {
    return question.answer.options.map((option, optionIndex) => ({
      id: optionIndex,
      option,
      answerCount: questAnswers.reduce(
        (acc, quest) =>
          acc +
          (quest.questions?.[questionIndex].answer.options.includes(optionIndex)
            ? 1
            : 0),
        0,
      ),
      answerPercent:
        (questAnswers.reduce(
          (acc, quest) =>
            acc +
            (quest.questions?.[questionIndex].answer.options.includes(
              optionIndex,
            )
              ? 1
              : 0),
          0,
        ) /
          questAnswers.length) *
        100,
      isCorrect: question.answer.correctAnswer.includes(optionIndex),
    }))
  }

  return <TableEdit columns={COLUMNS} initialRows={getTableRows()} />
}
