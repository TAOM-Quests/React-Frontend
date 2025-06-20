import {
  TableColumn,
  TableEdit,
} from '../../../../components/Table/TableEdit/TableEdit'
import { Quest } from '../../../../models/quest'
import { QuestQuestionBoxSorting } from '../../../../models/questQuestion'

interface QuestAnswerBoxSortingColumn {
  id: number
  boxName: string
  correctAnswerCount: number
  correctAnswerPercent: number
}

const COLUMNS: TableColumn<QuestAnswerBoxSortingColumn>[] = [
  {
    key: 'boxName',
    title: 'Контейнер',
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

export interface QuestAnalyticAnswerBoxSortingProps {
  questAnswers: Quest[]
  questionIndex: number
  question: QuestQuestionBoxSorting
}

export const QuestAnalyticAnswerBoxSorting = ({
  question,
  questAnswers,
  questionIndex,
}: QuestAnalyticAnswerBoxSortingProps) => {
  const getTableRows = (): QuestAnswerBoxSortingColumn[] =>
    question.answer.correctAnswer.map((box, index) => ({
      id: index,
      boxName: box.name,
      correctAnswerCount: questAnswers.reduce(
        (acc, quest) =>
          acc +
          (quest.questions?.[questionIndex].answer.correctAnswer.includes(index)
            ? 1
            : 0),
        0,
      ),
      correctAnswerPercent:
        (questAnswers.reduce(
          (acc, quest) =>
            acc +
            (quest.questions?.[questionIndex].answer.correctAnswer.includes(
              index,
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
