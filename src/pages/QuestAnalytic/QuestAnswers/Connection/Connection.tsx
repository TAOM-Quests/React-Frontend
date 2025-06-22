import {
  TableColumn,
  TableEdit,
} from '../../../../components/Table/TableEdit/TableEdit'
import { Quest } from '../../../../models/quest'
import { QuestQuestionConnection } from '../../../../models/questQuestion'

interface QuestAnswerConnectionColumn {
  id: number
  leftOptions: string
  rightOptions: string
  correctAnswerCount: number
  correctAnswerPercent: number
}

const COLUMNS: TableColumn<QuestAnswerConnectionColumn>[] = [
  {
    key: 'leftOptions',
    title: 'Левый элемент',
  },
  {
    key: 'rightOptions',
    title: 'Правый элемент',
  },
  {
    key: 'correctAnswerCount',
    title: 'Доля ответов',
  },
  {
    key: 'correctAnswerPercent',
    title: 'Количество ответов',
  },
]

export interface QuestAnalyticAnswerConnectionProps {
  questAnswers: Quest[]
  questionIndex: number
  question: QuestQuestionConnection
}

export const QuestAnalyticAnswerConnection = ({
  question,
  questAnswers,
  questionIndex,
}: QuestAnalyticAnswerConnectionProps) => {
  const getTableRows = (): QuestAnswerConnectionColumn[] =>
    question.answer.correctAnswer.map((optionPair, optionPairIndex) => ({
      id: optionPairIndex,
      leftOptions: question.answer.options[+optionPair.split('-').shift()!],
      rightOptions: question.answer.options[+optionPair.split('-').pop()!],
      correctAnswerCount: questAnswers.reduce(
        (acc, quest) =>
          acc +
          (quest.questions?.[questionIndex].answer.correctAnswer.includes(
            optionPairIndex,
          )
            ? 1
            : 0),
        0,
      ),
      correctAnswerPercent:
        (questAnswers.reduce(
          (acc, quest) =>
            acc +
            (quest.questions?.[questionIndex].answer.correctAnswer.includes(
              optionPairIndex,
            )
              ? 1
              : 0),
          0,
        ) /
          questAnswers.length) *
        100,
    }))

  return <TableEdit columns={COLUMNS} initialRows={getTableRows()} />
}
