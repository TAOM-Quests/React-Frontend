import {
  TableColumn,
  TableEdit,
} from '../../../../components/Table/TableEdit/TableEdit'
import { Quest } from '../../../../models/quest'
import { QuestQuestionSingle } from '../../../../models/questQuestion'

interface QuestAnswerSingleColumn {
  id: number
  option: string
  isCorrect: boolean
  answerCount: number
  answerPercent: number
}

const COLUMNS: TableColumn<QuestAnswerSingleColumn>[] = [
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

export interface QuestAnalyticAnswerSingleProps {
  questAnswers: Quest[]
  questionIndex: number
  question: QuestQuestionSingle
}

export const QuestAnalyticAnswerSingle = ({
  question,
  questAnswers,
  questionIndex,
}: QuestAnalyticAnswerSingleProps) => {
  const getTableRows = (): QuestAnswerSingleColumn[] => {
    return question.answer.options.map((option, optionIndex) => ({
      id: optionIndex,
      option,
      answerCount: questAnswers.reduce(
        (acc, quest) =>
          acc +
          (quest.questions?.[questionIndex]?.answer.userAnswer === optionIndex
            ? 1
            : 0),
        0,
      ),
      answerPercent:
        (questAnswers.reduce(
          (acc, quest) =>
            acc +
            (quest.questions?.[questionIndex]?.answer.userAnswer === optionIndex
              ? 1
              : 0),
          0,
        ) /
          questAnswers.length) *
        100,
      isCorrect: optionIndex === question.answer.correctAnswer,
    }))
  }

  return <TableEdit columns={COLUMNS} initialRows={getTableRows()} />
}
