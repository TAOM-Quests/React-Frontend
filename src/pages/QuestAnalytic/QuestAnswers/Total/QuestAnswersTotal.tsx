import moment from 'moment'
import {
  TableColumn,
  TableEdit,
} from '../../../../components/Table/TableEdit/TableEdit'
import { QuestComplete } from '../../../../models/quest'

interface QuestAnswerTotalColumn {
  id: number
  date: string
  time: string
  participantName: string
  correctAnswersCount: number
  correctAnswersPercent: number
}

const COLUMNS: TableColumn<QuestAnswerTotalColumn>[] = [
  {
    key: 'participantName',
    title: 'Участник',
  },
  {
    key: 'correctAnswersCount',
    title: 'Количество верных ответов',
  },
  {
    key: 'correctAnswersPercent',
    title: '% верных ответов',
  },
  {
    key: 'time',
    title: 'Время прохождения',
  },
  {
    key: 'date',
    title: 'Дата прохождения',
  },
]

export interface QuestAnswersTotalProps {
  questAnswers: QuestComplete[]
}

export const QuestAnswersTotal = ({ questAnswers }: QuestAnswersTotalProps) => {
  const getTableRows = (): QuestAnswerTotalColumn[] => {
    return questAnswers.map(answer => {
      const correctAnswersCount: number =
        answer.questions?.reduce(
          (acc, question) => acc + (question.answer.isCorrectAnswer ? 1 : 0),
          0,
        ) ?? 0

      return {
        id: answer.id,
        time: answer.time ?? '',
        date: moment(answer.date).format('DD.MM.YYYY'),
        participantName: answer.user.name,
        correctAnswersCount,
        correctAnswersPercent:
          (correctAnswersCount / (answer.questions?.length ?? 1)) * 100,
      }
    })
  }

  return <TableEdit columns={COLUMNS} initialRows={getTableRows()} />
}
